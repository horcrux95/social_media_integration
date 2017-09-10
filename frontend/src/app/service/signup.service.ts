import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { User } from '../models/user.model';
import {  Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";

@Injectable()
export class SignupService {

  constructor(private http: Http
              ,private router: Router
              ,private loginService:LoginService) { }

  signup(user:User):Observable<any>{
    return  this.http.post('http://localhost:8080/signup',user)
    .map((response: Response) => {
      let user = response.json();
      console.log("user returned");
      return user;
    })
    .catch(e => {
      if (e.status === 401) {
          console.log("unauthorized signup");
          return Observable.throw('Unauthorized');
      }
  });

}

logout(){
  this.loginService.logout();
}
isLoogedIn(){
  if(Cookie.get('session'))
    return true;
  else
    return false;
}

}
