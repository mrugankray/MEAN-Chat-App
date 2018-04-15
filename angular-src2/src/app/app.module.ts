import { Component, NgModule } from '@angular/core';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
// import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RouterModule, Routes } from '@angular/router';

import { AboutMeComponent } from './component/about-me/about-me.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth_guard/auth.guard';
import { AuthService } from './service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ChatFormComponent } from './component/chat-form/chat-form.component';
import { ChatService } from './service/chat.service';
import { ChatroomComponent } from './component/chatroom/chatroom.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FeedComponent } from './component/feed/feed.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { HttpModule } from '@angular/http';
// import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { MessageComponent } from './component/message/message.component';
import { NavbarComponent } from './component/navbar/navbar.component';
// import { Ng4FilesModule } from 'angular4-files-upload';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { UserItemComponent } from './component/user-item/user-item.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { ValidateService } from './service/validate.service';

const appRoutes: Routes = [
  // {path: '', component: HomeComponent},
  {path: 'sign_up', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  // {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // {path: 'about_me', component : AboutMeComponent},
  {path: 'chatroom', component: ChatroomComponent},
  {path: '', redirectTo: 'sign_up', pathMatch: 'full'},
  {path: '**', redirectTo: 'sign_up', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AboutMeComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserItemComponent,
    FileSelectDirective,
    MainComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, FlashMessagesModule
     , HttpModule
  ],
  providers: [ValidateService, FlashMessagesService , AuthService , AuthGuard
    , ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
