import { Cookie } from 'ng2-cookies';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {  Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Guser } from '../models/guser.model';


@Injectable()
export class GoogleLoginService {


  constructor(private http: Http,private router: Router) { }

  googleLogin(user:Guser):Observable<any>{
    return  this.http.post('http://localhost:8080/gglogin',user)
    .map((response: Response) => {
      let user = response.json();
      console.log("user returned");
      return user;
    })
    .catch(e => {
      if (e.status === 401) {
          console.log("unauth");
          return Observable.throw('Unauthorized');
      }
  });

}

}
