import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Cookie } from 'ng2-cookies';

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor(private router :Router){}
    
    canActivate(route : ActivatedRouteSnapshot,
                state : RouterStateSnapshot) 
                : Observable<boolean> | Promise<boolean> | boolean
                 {
                       // console.log(Cookie.get('session'));
                       // console.log("coming from url" +this.router.url);
                       
                        if(Cookie.get('session')){
                            return true;
                        }
                        else{
                            this.router.navigate(['']);
                        }
                    
                
            }

    canActivateChild(route : ActivatedRouteSnapshot,
        state : RouterStateSnapshot) 
        : Observable<boolean> | Promise<boolean> | boolean{
            return this.canActivate(route,state);
        }        
}