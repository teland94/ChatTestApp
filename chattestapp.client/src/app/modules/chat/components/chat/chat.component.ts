import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { MessageService } from '../../services/message.service';
import { Message } from '../../model/message';
import { CreateMessageDto } from '../../model/create-message-dto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  public messages: Message[] = [];
  public newMessage: string = '';
  public userName: string = '';

  @ViewChild('messagesContainer', { static: true }) messagesContainer!: ElementRef;

  constructor(private signalRService: SignalRService,
              private messageService: MessageService,
              private cd: ChangeDetectorRef,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.signalRService.startConnection();

    this.userName = 'User' + Math.floor(Math.random() * 1000);

    this.signalRService.onMessageReceived((message: Message) => {
      this.messages.push(message);
      this.cd.detectChanges();
      this.scrollToBottom();
    });

    this.messageService.getMessages().subscribe(messages => {
      this.messages = messages;
      this.cd.detectChanges();
      this.scrollToBottom();
    });
  }

  public ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }

  public sendMessage(): void {
    if (!this.newMessage) {
      return;
    }

    const createdMessage: CreateMessageDto = {
      user: this.userName,
      content: this.newMessage
    };

    this.messageService.sendMessage(createdMessage).subscribe(sentMessage => {
      const message: Message = {
        id: sentMessage.id,
        user: sentMessage.user,
        content: sentMessage.content,
        createdDate: sentMessage.createdDate
      };

      this.signalRService.sendMessage(message).then(() => {
        this.newMessage = '';
        this.cd.detectChanges();
        this.scrollToBottom();
      });
    });
  }

  trackByMessageId(index: number, message: Message): number {
    return message.id;
  }

  private scrollToBottom(): void {
    this.renderer.setProperty(this.messagesContainer.nativeElement,
      'scrollTop', this.messagesContainer.nativeElement.scrollHeight);
  }
}
