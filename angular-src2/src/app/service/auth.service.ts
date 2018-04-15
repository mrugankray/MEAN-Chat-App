import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Headers, Http, HttpModule, Response } from '@angular/http';

// import { FileUploader } from 'ng2-file-upload';
// import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http
  ) { }
  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/sign_up', user, {headers: headers})
      .map(res => res.json());
  }
  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.authToken = token;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:8080/users/profile', {headers: headers})
    .map(res => res.json());
  }
  logout() {
    this.user = null;
    this.authToken = null;
    localStorage.clear();
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
  uploadImage() {
   /* const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.fileuploader.('http://localhost:8080/users/upload', {headers: headers})
    .catch(this.errorhandler);
    */
  }
  errorhandler(error: Response) {
    console.log(error);
    const message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
  }
}
