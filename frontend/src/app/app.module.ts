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
import { GoogleSigninComponent } from './google-login/google-login.component';
import { enableProdMode} from '@angular/core';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { LinkedInSdkModule } from 'angular-linkedin-sdk';
import { AuthorizeComponent } from './authorize/authorize.component';
import { IntercompService } from './service/intercomp.service';
import { GoogleLoginService } from './service/google-login.service';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    DummyComponent,
    UserSignupComponent,
    GoogleSigninComponent,
    LinkedinComponent,
    AuthorizeComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LinkedInSdkModule,
  ],

  providers: [ LoginService,SignupService,
               AuthGaurd,DirectGuard,IntercompService,
               GoogleLoginService,
               { provide: 'apiKey', useValue: '78q9jktjl5ag3m' }
              ],

  bootstrap: [AppComponent]
})
export class AppModule { }
