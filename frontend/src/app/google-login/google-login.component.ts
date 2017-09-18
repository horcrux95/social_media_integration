import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router ,ActivatedRoute} from "@angular/router";
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import { IntercompService } from '../service/intercomp.service';
import { GoogleLoginService } from '../service/google-login.service';
import { Guser } from '../models/guser.model';
declare const gapi: any;

@Component({
  selector: 'app-google-login',
  template: '<button id="googleBtn">Google Sign-In</button>'
})
export class GoogleSigninComponent implements AfterViewInit,OnInit {

  private clientId:string = '714158531311-qsb1n12c0jie7tb60oe02pm66j4s0rin.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;

  constructor(
    private element     : ElementRef,
    private http        : Http,
    private  router     : Router,
    private  route      : ActivatedRoute,
    private intercomp   : IntercompService,
    private googleLogin : GoogleLoginService )
 {
      //  /   console.log('ElementRef: ', this.element);
  }

  public googleInit() {        
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
       // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        //console.log( 'Name: ' + profile.getName());
        console.log( 'email: ' + profile.getEmail());
        //console.log( 'img ' + profile.getImageUrl());
       // console.log( 'img ' + profile.BY());
        
      //  console.log(profile);
      // Cookie.set('session',googleUser.getAuthResponse().id_token);
      // Cookie.set('type','google');
      // this.router.navigateByUrl('profile');
        var user = new Guser( profile.getEmail(),googleUser.getAuthResponse().id_token,profile.getId(),profile.getImageUrl());
       
      this.googleLogin.googleLogin(user)
      .subscribe(user => 
                {   console.log(user);
                   
                    
                    if(user.message=='signup'){
                      console.log('redirect to signup');
                      this.router.navigateByUrl('');
                    }else{
                      Cookie.set('session',user.id);
                      Cookie.set('type','google');
                      
                      this.router.navigateByUrl('profile');
                    }
                    
                }, 
                (err) => 
                {
                  if (err === 'Unauthorized') 
                      { console.log("weare back");
                        this.router.navigate(["/dummy"],{relativeTo : this.route });
                      }
                }
              );
        
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

 

  ngAfterViewInit() {
    this.googleInit();
  }

  ngOnInit(){
    console.log("listening to event");

    this.intercomp.customLogout.subscribe(
      (data:boolean)=>{

        console.log("event recieved in component:)");
        // this.signOut();
        Cookie.delete('session');
        Cookie.delete('type');
        this.auth2 = this.auth2.disconnect().then(function () {
          
         console.log('User signed out.');
        
          
       });
         this.router.navigateByUrl('');
      }
    )
  }

  public signOut(){
    this.auth2 = this.auth2.disconnect().then(function () {
      Cookie.delete('session');
      Cookie.delete('type');
     console.log('User signed out.');
    
      
   });

 }

 
}