import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import {SignalRService} from "./services/signal-r.service";
import {MessageService} from "./services/message.service";



@NgModule({
  declarations: [
    ChatComponent
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [SignalRService, MessageService]
})
export class ChatModule { }
