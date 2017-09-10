import { SignupService } from './service/signup.service';
import { DirectGuard } from './service/direct-guard.service';
import { AuthGaurd } from './service/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { BrowserXhr } from '@angular/http';
import {CustExtBrowserXhr} from './cust-ext-browser-xhr';
import { Routes,RouterModule }  from '@angular/router';
import { AppRoutingModule } from "./app-routing.module";

import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { LoginService } from './service/login.service';
import { DummyComponent } from './dummy/dummy.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    DummyComponent,
    UserSignupComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [LoginService,SignupService,AuthGaurd,DirectGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
