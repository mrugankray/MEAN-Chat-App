import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private flashmessages: FlashMessagesService,
    private router: Router,
    private authservice: AuthService) { }
  username: string;
  password: string;
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authservice.authenticateUser(user).subscribe(data => {
      // console.log(data);
      if (data.success) {
        this.authservice.storeUserData(data.token, data.user);
        this.flashmessages.show(`${user.username} you are logged in`, {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/main']);
      } else {
        this.flashmessages.show(data.msg, {cssClass: 'alert-danger' , timeout: 3000});
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit() {
  }

}
