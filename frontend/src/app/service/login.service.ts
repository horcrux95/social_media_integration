import { Cookie } from 'ng2-cookies';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {  Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";


@Injectable()
export class LoginService {

  constructor(private http: Http,private router: Router) { }

  login(user:User):Observable<any>{
      return  this.http.post('http://localhost:8080/login',user)
      .map((response: Response) => {
        let user = response.json();
        console.log("no user ret");
        return user;
      })
      .catch(e => {
        if (e.status === 401) {
            console.log("unauth");
            return Observable.throw('Unauthorized');
        }
    });

  }

  logout(){
    this.http.post('http://localhost:8080/logout',{});
    this.router.navigateByUrl('login');
  }

  isLoogedIn(){
    if(Cookie.get('session'))
      return true;
    else
      return false;
  }

  userTwitterLogin(){
    
  }
}
