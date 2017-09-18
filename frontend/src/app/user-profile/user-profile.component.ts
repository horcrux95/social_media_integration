import { Cookie } from 'ng2-cookies';
import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from './../service/login.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { IntercompService } from '../service/intercomp.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
  //, providers: [IntercompService]
})


export class UserProfileComponent implements OnInit {
  router :any;
 
  @Output() customLogout = new EventEmitter();
 
 
  constructor(private loginService : LoginService,
              private _router: Router,
              private intercomp: IntercompService,
            ) 
  { 
  
                this.router = _router;
 //   console.log(this.router.url);
  }

  ngOnInit() {
  }

  logout(){
    
    if(Cookie.get('type')=='user'){
      Cookie.delete('session');
      this.loginService.logout();
    }
    else if(Cookie.get('type')=='google')
    {
        console.log("can log you out right now");
        this.intercomp.customLogout.emit(true);
    }
    
  }

}
