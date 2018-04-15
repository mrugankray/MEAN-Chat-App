import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from './../../service/auth.service';
import { ChatService } from './../../service/chat.service';
import { IChatMessage } from './../../interface/chat-message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: IChatMessage;

  email: string;
  name: string;
  messageContent: string;
  timestamp: Date;
  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timestamp = chatMessage.timeSent;
    this.email = chatMessage.email;
    this.name = chatMessage.name;
  }

}
