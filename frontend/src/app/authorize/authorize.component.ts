import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

  showComp: string ='Login';

  constructor() {
    this.showComp='Login';
    console.log("construcotr of auth called");
    console.log(this.showComp);
  }

  ngOnInit() {
    console.log("auth initalized");
  }
  
  toggle(comp:string){
    console.log(comp);
    this.showComp=comp;
  }


}
