import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { AuthService } from 'src/app/login/auth/auth.service';
import { RequestHeader } from 'src/app/login/shared/model/keycloak-user-info/Header/request-header';
import { ResponseHeader } from 'src/app/login/shared/model/keycloak-user-info/Header/response-header';
import { KeycloakUserInfoRequest } from 'src/app/login/shared/model/keycloak-user-info/keycloak-user-info-request';
import { KeycloakUserInfoRequestBody } from 'src/app/login/shared/model/keycloak-user-info/keycloak-user-info-request-body';
import { KeycloakUserInfoResponse } from 'src/app/login/shared/model/keycloak-user-info/keycloak-user-info-response';
import { KeycloakUserInfoService } from 'src/app/login/shared/services/keycloak-user-info.service';
import { loginCookieStoreKey, userIdStoreKey, userNameStoreKey, mobileNoStoreKey, roleIdStoreKey, emailStoreKey, branchStoreKey, cspStoreKey, loginOidStoreKey, clusterOidStoreKey, agentClusterOidStoreKey, branchOidStoreKey, cspOidStoreKey } from '../constant/constant';
import { Header } from '../request/base-request';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.scss']
})
export class LocalStorageComponent implements OnInit {

  header: Header = new Header();

  isLoading = false;
  isError: boolean;

  requestHeader: RequestHeader = new RequestHeader();
  responseHeader: ResponseHeader = new ResponseHeader();

  keycloakUserInfoRequest: KeycloakUserInfoRequest = new KeycloakUserInfoRequest();
  keycloakUserInfoRequestBody: KeycloakUserInfoRequestBody = new KeycloakUserInfoRequestBody();
  keycloakUserInfoResponse: KeycloakUserInfoResponse = new KeycloakUserInfoResponse();

  constructor(
    private authService: AuthService,
    private sidebarservice: SidebarService,
    private _appStorageService: AppStorageService,
    private toastr: ToastrService,
    private oauthService: OAuthService,
    private route: Router,
    private keycloakUserInfoservice: KeycloakUserInfoService,
  ) { }

  ngOnInit(): void {
    // this.keycloakUserInfo();
    // console.log(localStorage);
  }

  keycloakUserInfo() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    // this.keycloakUserInfoRequestBody.userName = this.authService.username
    console.log(this.keycloakUserInfoRequestBody.userName);


    this.keycloakUserInfoRequest.body = this.keycloakUserInfoRequestBody;
    this.keycloakUserInfoRequest.header = this.requestHeader;

    this.keycloakUserInfoservice.getUsers(this.keycloakUserInfoRequest).subscribe(resData => {
      console.log(resData);

      // this.authService.loginResponseBody = resData.body;
      this.isError = false;

      if (resData.body.loginStatus == "OK") {
        this._appStorageService.setData(loginCookieStoreKey, resData.body.menuJson);
        this._appStorageService.setData(userIdStoreKey, resData.body.agentId);
        this._appStorageService.setData(userNameStoreKey, resData.body.userName);
        this._appStorageService.setData(mobileNoStoreKey, resData.body.agentMobileNo);
        this._appStorageService.setData(roleIdStoreKey, resData.body.roleOid);
        this._appStorageService.setData(emailStoreKey, resData.body.email);
        this._appStorageService.setData(branchStoreKey, resData.body.branchName);
        this._appStorageService.setData(cspStoreKey, resData.body.cspName);
        this._appStorageService.setData(loginOidStoreKey, resData.body.oid);
        this._appStorageService.setData(clusterOidStoreKey, resData.body.clusterOid);
        this._appStorageService.setData(agentClusterOidStoreKey, resData.body.agentClusterOid);
        this._appStorageService.setData(branchOidStoreKey, resData.body.branchOid);
        this._appStorageService.setData(cspOidStoreKey, resData.body.cspOid);

        // if (resData.body.roleOid == 'AGENT'){
        //   localStorage.setItem('loggedIn', 'true');
        //   this.route.navigate(['agent-dashboard']);
        //   this.toastr.success('Login Successful!');
        // } 
        // else if(resData.body.roleOid == 'BDEX'){
        //   localStorage.setItem('loggedIn', 'true');
        //   this.route.navigate(['bdex-dashboard']);
        //   this.toastr.success('Login Successful!');
        // } 
        // else if (resData.body.roleOid == 'ADMIN'){
        //   localStorage.setItem('loggedIn', 'true');
        //   this.route.navigate(['dashboard']);
        //   this.toastr.success('Login Successful!');
        // }

        // TO use Keycloak Service 

        // if (this.authService.isAdmin()) this.route.navigateByUrl('/dashboard');
        // else if (this.authService.isAgent()) this.route.navigateByUrl('/agent-dashboard');
        // else if (this.authService.isBdex()) this.route.navigateByUrl('/bdex-dashboard');

      }
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }
}



