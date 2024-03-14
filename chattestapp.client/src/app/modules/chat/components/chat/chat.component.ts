import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { MessageService } from '../../services/message.service';
import { Message } from '../../model/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messages: Message[] = [];
  public newMessage: string = '';
  public userName: string = '';

  constructor(private signalRService: SignalRService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.signalRService.startConnection();

    this.userName = 'User' + Math.floor(Math.random() * 1000);

    this.signalRService.onMessageReceived((message: Message) => {
      this.messages.push(message);
    });

    this.messageService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  public sendMessage() {
    if (!this.newMessage) {
      return;
    }

    this.signalRService.sendMessage(this.userName, this.newMessage);

    this.newMessage = '';
  }
}
