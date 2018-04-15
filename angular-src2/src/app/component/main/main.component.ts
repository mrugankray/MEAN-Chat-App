import { Component, OnInit } from '@angular/core';
import { Headers, Http, HttpModule, Response } from '@angular/http';

import { AuthService } from './../../service/auth.service';
import { ChatService } from './../../service/chat.service';
import {Observable} from 'rxjs/Observable';
import { UserItemComponent } from './../user-item/user-item.component';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  authToken: string;
  message: string;
  user: object;
  datasFromDatabase: string;
  user_data: string;
  incomingPosts: string;
  defaultInitialise: boolean = true;
  initial: boolean = true;
  difference: number;
  constructor(private authservice: AuthService,
              private chatservice: ChatService,
              private http: Http) { }
  send() {
    this.chatservice.sendMessage(this.message);
    console.log('send is working');
    this.message = '';
  }
  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
  ngOnInit() {
    this.getPosts(this.initial);
      const interval =  timer(15000);
      interval.subscribe((t) => {
      this.interval(t);
    });
  }

  testSend() {
    this.loadToken();
    console.log('running test');
    const userData = {
      tweet: this.message,
      user_data: this.user_data
    };
    this.chatservice.testMessage(userData)
    .subscribe((data) => {
      console.log(data);
      this.datasFromDatabase = data;
    });
    this.message = '';
  }

  getPosts(initial: boolean) {
    if (initial) {
      this.chatservice.getPosts()
      .subscribe((data) => {
        console.log(data);
        this.datasFromDatabase = data;
      });
    } else {
      this.chatservice.getPosts()
      .subscribe((data) => {
        console.log(data);
        if (data.length > this.datasFromDatabase.length) {
          this.incomingPosts = data;
        }
      });
    }
  }

  setNewPosts() {
    this.datasFromDatabase = Object.assign({}, this.incomingPosts);
    this.incomingPosts = undefined;
  }

  interval(interval: number) {
      this.initial = !this.interval;
      this.getPosts(this.initial);
      if (this.incomingPosts) {
        this.difference = this.incomingPosts.length - this.datasFromDatabase.length;
      }
      console.log('interval is working');
      this.initial = !this.interval;
    }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.user_data = localStorage.getItem('user');
    this.authToken = token;
  }
}
