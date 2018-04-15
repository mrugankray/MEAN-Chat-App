import { Component, OnInit } from '@angular/core';

import { ChatService } from './../../service/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;
  constructor(private _chatservice: ChatService) { }
  send() {
    this._chatservice.sendMessage(this.message);
    console.log('send is working');
    this.message = '';
  }
  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
  ngOnInit() {
  }

}
