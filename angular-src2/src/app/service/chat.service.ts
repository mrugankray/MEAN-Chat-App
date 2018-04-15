import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Headers, Http, HttpModule, Response } from '@angular/http';

import { AuthService } from './auth.service';
import { IChatMessage } from './../interface/chat-message';
import { Injectable } from '@angular/core';
import { Iuser } from './../interface/user.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  // chatMessage: ;
  constructor(private _authservice: AuthService,
              private http: Http) { }
  user: Object;
  chatMessages: Observable<IChatMessage[]>;
  chatMessage: IChatMessage;
  getTimeStamp() {
    const now = new Date;
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1 ) + '/' +
    now.getUTCDate();
    const day = now.getUTCHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return (date + ' ' + day);
  }

  getMessages(): void {
    // getMessages should be  observable of type IChatMessage
    console.log('getMessages is working');
    const email = 'mrugankray@gmail.com';
    const name = 'mrugank';
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    console.log('sendmessage works');
    console.log(timestamp);
    // const email = this.user.email;
    // const name = this.user.name;
    const email = 'mrugankray@gmail.com';
    const name = 'mrugank';
    /*this.chatMessage = this.getMessages();
    this.chatMessage.push({
        message: msg,
        timeSent: timestamp,
        email: email,
        name: name
    });*/
  }

  // just for testing
  testMessage(userData: Object) {
    return this.http.post('http://localhost:8080/users/chat', userData)
    .map(data => data.json());
    // .subscribe(data => console.log('data:tweets', data));
    }
  // to get the messages
  getPosts() {
    return this.http.get('http://localhost:8080/users/getPosts')
    .map(data => data.json());
    // .subscribe(data => console.log('data:tweets', data));
  }
}
