import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private flashmessages: FlashMessagesService,
    private router: Router,
    public authservice: AuthService) { }

  ngOnInit() {
  }
  onClickLogout() {
    this.authservice.logout();
    this.flashmessages.show('you are logged out', {cssClass: 'alert-success' , timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}
