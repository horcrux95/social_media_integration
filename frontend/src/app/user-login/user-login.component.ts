import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router ,ActivatedRoute} from "@angular/router";
import 'rxjs/Rx';

import { Cookie } from 'ng2-cookies';

import { LoginService } from './../service/login.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  email : string;
  password :string;
  loggeduser :User;
  constructor(private http:Http,
              private  router : Router,
              private  route : ActivatedRoute,
              private  loginService : LoginService) {}

  ngOnInit() {
    console.log("Component called again");
  }

  login(){
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(this.email + " " + this.password);
    var user= new User(this.email,this.password);
  
    this.loginService.login(user)
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
