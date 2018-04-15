import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  newUserEmail: string;
  newUserBio: string;
  pass_user_data: string;
  authToken: string;
  toggle: boolean = false;
  filesToUpload: Array<File>;
  constructor(
    private flashmessages: FlashMessagesService,
    private router: Router,
    private authservice: AuthService) {
      this.filesToUpload = [];
    }

  ngOnInit() {
    this.authservice.getProfile().subscribe(profile => {
      this.user = profile.user;
    }, err => {
      console.log(err);
      return false;
    });
  }
  onSubmit(): void {
    this.upload();
    // const newUserData = JSON.stringify(this.newUserDetails);
    /*const request = {
      userId: user_data._id,
      Email: user_data.email
    };*/
    this.toggle = !this.toggle;
    console.log('onSubmit is toggling');
    // return newUserData;
  }

  edit(): void {
    this.toggle = !this.toggle;
    console.log('edit is toggling');
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    const user_data = localStorage.getItem('user');
    this.authToken = token;
    this.pass_user_data = user_data;
  }

  upload(): void {
    this.makeFileRequest('http://localhost:8080/users/upload', [], this.filesToUpload).then((result) => {
        console.log(result);
    }, (error) => {
        console.error(error);
    });
    this.loadToken();
    // console.log(this.pass_user_data);
    console.log(this.newUserBio);
    console.log(this.newUserEmail);
}

fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>> fileInput.target.files;
}

makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
  this.loadToken();
    return new Promise((resolve, reject) => {
        const formData: any = new FormData();
        const xhr = new XMLHttpRequest();
        for (let i = 0; i < files.length; i++) {
            formData.append('uploads[]', files[i], files[i].name);
            formData.append('user_data', this.pass_user_data);
            formData.append('newUserEmail', this.newUserEmail);
            formData.append('newUserBio', this.newUserBio);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        };
        xhr.open('POST', url, true);
        xhr.send(formData);
    });
  }
}
