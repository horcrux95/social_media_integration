import { Injectable, EventEmitter, Output } from '@angular/core';


@Injectable()
export class IntercompService {

 @Output() customLogout = new EventEmitter<boolean>();
  constructor() { }

}
