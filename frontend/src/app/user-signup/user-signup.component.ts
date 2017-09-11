import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router ,ActivatedRoute} from "@angular/router";
import 'rxjs/Rx';

import { Cookie } from 'ng2-cookies';

import { LoginService } from './../service/login.service';
import { SignupService } from './../service/signup.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html'
 // styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  email : string;
  password :string;
  loggeduser :User;

  constructor(private http:Http,
              private  router : Router,
              private  route : ActivatedRoute,
              private  loginService : LoginService,
              private  signupService : SignupService ) {}

  ngOnInit() {
    console.log("Signup Component called");
  }

  signup(){
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(this.email + " " + this.password);
    var user= new User(this.email,this.password);
  
    this.signupService.signup(user)
        .subscribe(user => 
                  {   console.log(user);
                      this.loggeduser = user;
                      Cookie.set('session',user._id);
                      this.router.navigateByUrl('profile');
                  }, 
                  (err) => 
                  {
                    if (err === 'Unauthorized') 
                        { console.log("weare back");
                          this.router.navigate(["/dummy"],{relativeTo : this.route });
                        }
                  }
                );

  }

  

}
