import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IForm } from './../../interface/iform';
import { Router } from '@angular/router';
import { ValidateService } from './../../service/validate.service';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registration: IForm[];
  name: string;
  username: string;
  email: string;
  password: string;
  remember_me: boolean = false;
  constructor(private validateservice: ValidateService,
              private flashmessages: FlashMessagesService,
              private router: Router,
              private authservice: AuthService) { }
  onSubmit() {
      const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    // Required Fields
  if (!this.validateservice.validateRegister(user)) {
    this.flashmessages.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    console.log('all fields are required');
    return false;
  }
  // Validate Email
  if (!this.validateservice.validateEmail(user.email)) {
  this.flashmessages.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
  console.log('invalid email');
    return false;
  }
  // Register user
  this.authservice.registerUser(user).subscribe(data => {
  if (data.success) {
    this.flashmessages.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
  } else {
    this.flashmessages.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    this.router.navigate(['/sign_up']);
  }
  });
  }
}
