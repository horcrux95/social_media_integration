import { Component, OnInit } from '@angular/core';
import { LinkedInService } from 'angular-linkedin-sdk';
import { Http } from '@angular/http';

var access_token="";
var tok = localStorage.getItem('token');

var login_status="";
var linkedin_state=false;


@Component({
  selector: 'app-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})


export class LinkedinComponent implements OnInit {

  constructor(private http:Http,private linkedInService: LinkedInService) { }

  ngOnInit() {
  }

 

  public subscribeToisInitialized(){
    this.linkedInService.isInitialized$.subscribe({
    next: (state) => {
      console.log(state);
      linkedin_state=state;
    },
    complete: () => {
      this.linkedinLogin();
    }
  });
}

public linkedinLogin(){
  this.linkedInService.login().subscribe({
    next: (state) => {
      console.log(state);
      this.linkedinrawApiCall();
    },
    complete: () => {
      // Completed
    }
  });
}

public linkedinrawApiCall(){
  const url = '/people/~:(id,first-name,email-address,picture-url)?format=json';
  this.linkedInService.raw(url)
    .asObservable()
      .subscribe({
        next: (data) => {
          console.log("got data");
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('RAW API call completed');
        }
      });


}

public subscribeToLogout(){
  this.linkedInService.logout().subscribe({
    next: () => {
      // does not emit a value 
    },
    complete: () => {
      // Completed
    }
  });
}

}
