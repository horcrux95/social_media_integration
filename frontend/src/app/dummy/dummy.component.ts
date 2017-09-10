import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy',
  template:''
})
export class DummyComponent implements OnInit {

  constructor( private  router : Router,
               private  route : ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(["/login"],{relativeTo : this.route });
  }

}
