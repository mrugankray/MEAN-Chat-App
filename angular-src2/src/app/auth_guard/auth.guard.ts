import { CanActivate, Router } from '@angular/router';

import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor (private router: Router,
              private authservice: AuthService) {

              }
  canActivate () {
    if (this.authservice.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
