import { Component, Injectable } from '@angular/core';
import { LoginResponseBody } from 'src/app/login/shared/model/login-response-body';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: '../../app.component.html',
  styleUrls: [ '../../app.component.scss' ]
})

export class SidebarService {

  menus =[];

  toggled = false;
  _hasBackgroundImage = true;


  
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
