
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ROLE_TYPE_ADMIN, ROLE_TYPE_GUARDIAN, ROLE_TYPE_INSTITUTE, ROLE_TYPE_STUDENT, ROLE_TYPE_TEACHER, USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class Header implements OnInit {
  public faCoffee = faCoffee;
  public menu: any;
  public userInfo: UserInfo = new UserInfo();
  public dashboardPath: String;
  public showMyAccountMenu: boolean;
  public showLoggedInMenu: boolean;

  constructor(
    private route: Router,
    private _appStorageService: AppStorageService
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll(event: Event) {
    if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
      document.getElementById('sticky-menu').classList.add('nav-blur');
    }
    else {
      document.getElementById('sticky-menu').classList.remove('nav-blur');
    }
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedIn');
  }

  ngOnInit() {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    if (this.isLoggedIn && this.userInfo != null) {
      this.showMyAccountMenu = true;
      this.showLoggedInMenu = false;
      if (this.userInfo.roleType == ROLE_TYPE_ADMIN) {
        this.dashboardPath = '/admin/dashboard';
      } else if (this.userInfo.roleType == ROLE_TYPE_INSTITUTE) {
        this.dashboardPath = '/school/dashboard';
      } else if (this.userInfo.roleType == ROLE_TYPE_TEACHER) {
        this.dashboardPath = '/teacher/dashboard';
      } else if (this.userInfo.roleType == ROLE_TYPE_STUDENT) {
        this.dashboardPath = '/student/dashboard';
      } else if (this.userInfo.roleType == ROLE_TYPE_GUARDIAN) {
        this.dashboardPath = '/guardian/dashboard';
      }

    } else {
      this.showMyAccountMenu = false;
      this.showLoggedInMenu = true;
    }

  }

  ngAfterViewInit() {
  }

}
