import { UserSignupComponent } from './user-signup/user-signup.component';
import { DirectGuard } from './service/direct-guard.service';
import { AuthGaurd } from './service/auth-guard.service';
import { DummyComponent } from './dummy/dummy.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from "@angular/router";

const appRoutes : Routes=[
    { path: 'login' , canActivate:[DirectGuard],component : UserLoginComponent },
    { path: 'profile' ,canActivate:[AuthGaurd], component : UserProfileComponent },
    { path: 'dummy'  , component : DummyComponent},
    { path: 'signup' , component : UserSignupComponent }
  ];


@NgModule({
imports:[
    RouterModule.forRoot(appRoutes)
],
exports: [RouterModule]
})
export class AppRoutingModule{

}