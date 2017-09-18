import { Component } from '@angular/core';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  router :any;

constructor(private loginService :LoginService, private _router: Router){
  this.router = _router;
}

}
