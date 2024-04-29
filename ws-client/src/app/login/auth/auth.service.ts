
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { branchStoreKey, cspStoreKey, emailStoreKey, mobileNoStoreKey, roleIdStoreKey, userIdStoreKey, userNameStoreKey } from 'src/app/common/constant/constant';
import { LoginResponseBody } from '../shared/model/login-response-body';
import { AppStorageService } from './app-storage.service';

import {
  AuthConfig,
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthEvent,
  OAuthService,
  OAuthSuccessEvent,
} from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  loginResponseBody: LoginResponseBody;

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')

  constructor(private http: HttpClient,
    private _appStorageService: AppStorageService,
    private _router: Router,
    private oauthService: OAuthService
  ) {
    // To use Keycloak service
    // this.configure();
  }

  isloggedIn(value: boolean) {
    if (this.loginResponseBody?.loginStatus === "OK") {
      this.loggedInStatus = value;
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  get currentUserName() {
    return this._appStorageService.getData(userNameStoreKey);
  }

  get currentUserId() {
    return this._appStorageService.getData(userIdStoreKey);
  }

  get currentUserMobileNo() {
    return this._appStorageService.getData(mobileNoStoreKey);
  }

  get currentRoleOid() {
    return this._appStorageService.getData(roleIdStoreKey);
  }

  get currentEmail() {
    return this._appStorageService.getData(emailStoreKey);
  }

  get currentBranch() {
    return this._appStorageService.getData(branchStoreKey);
  }

  get currentCsp() {
    return this._appStorageService.getData(cspStoreKey);
  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/']);
  }

  isAdminUser(): boolean {
    if (this.loginResponseBody.loginStatus == "OK") {
      return true;
    }
    return false;
  }





}
