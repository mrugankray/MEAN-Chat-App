import { Component, OnChanges, OnInit } from '@angular/core';

import { ChatService } from './../../service/chat.service';
import { IChatMessage } from './../../interface/chat-message';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
feed: any; // should be observable of type IChatMessage
  constructor(private _chatservice: ChatService) { }

  ngOnInit() {
    this.feed = this._chatservice.getMessages();
    console.log('feed initializing....');
  }

  ngOnChanges( ) {
    this.feed = this._chatservice.getMessages();
  }

}
