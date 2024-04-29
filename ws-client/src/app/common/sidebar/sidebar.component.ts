import { AfterViewInit, Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { loginCookieStoreKey } from '../constant/constant';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { AuthService } from 'src/app/login/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public menus: Object[];
  public userName$: any;
  public roleOid$: any;

  constructor(public sidebarservice: SidebarService,
    private _appStorageService: AppStorageService,
    private _authService: AuthService,
    private translate: TranslateService,
    private _router: Router) {

    translate.setDefaultLang('En');
  }

  changeLanguage(lan: string) {
    this.translate.use(lan);
    this.setActiveLanguageLink();
  }

  setActiveLanguageLink() {
    if (this.translate.currentLang === 'en') {
      $('#englishLangLink').addClass("active");
      $('#banglaLangLink').removeClass("active");
      document.documentElement.setAttribute('lang', 'en');
    }
    else if (this.translate.currentLang === 'bn') {
      $('#banglaLangLink').addClass("active");
      $('#englishLangLink').removeClass("active");
      document.documentElement.setAttribute('lang', 'bn');
    }
  }

  ngOnInit() {
    let userInfo = this._appStorageService.getData(loginCookieStoreKey);
    // console.log(userInfo);

    if (userInfo != null) {
      this.menus = JSON.parse(userInfo);
    }

    this.userName$ = this._authService.currentUserName;
    this.roleOid$ = this._authService.currentRoleOid;
  }


  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  public selectedPrevMenu: any;
  public count = 0;
  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          if (this.count != 0 && this.selectedPrevMenu != currentMenu) {
            this.selectedPrevMenu.active = false;
          }
        }
      });
      this.selectedPrevMenu = currentMenu;
      this.count++;
    }
  }


  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.setActiveLanguageLink());
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  logout(): void {
    this._authService.logout();
  }

}
