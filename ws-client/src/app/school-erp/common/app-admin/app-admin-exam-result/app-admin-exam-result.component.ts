import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { agentClusterOidStoreKey, branchOidStoreKey, branchStoreKey, clusterOidStoreKey, cspOidStoreKey, cspStoreKey, emailStoreKey, loginCookieStoreKey, loginOidStoreKey, mobileNoStoreKey, roleIdStoreKey, userIdStoreKey, userNameStoreKey } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { SidebarService } from 'src/app/common/sidebar/sidebar.service';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { AuthService } from 'src/app/login/auth/auth.service';
import { RequestHeader } from 'src/app/login/shared/model/keycloak-user-info/Header/request-header';
import { ResponseHeader } from 'src/app/login/shared/model/keycloak-user-info/Header/response-header';
import { KeycloakUserInfoRequest } from 'src/app/login/shared/model/keycloak-user-info/keycloak-user-info-request';
import { KeycloakUserInfoRequestBody } from 'src/app/login/shared/model/keycloak-user-info/keycloak-user-info-request-body';
import { KeycloakUserInfoResponse } from 'src/app/login/shared/model/keycloak-user-info/keycloak-user-info-response';
import { KeycloakUserInfoService } from 'src/app/login/shared/services/keycloak-user-info.service';

@Component({
  selector: 'app-app-admin-exam-result',
  templateUrl: './app-admin-exam-result.component.html',
  styleUrls: ['./app-admin-exam-result.component.scss']
})
export class AppAdminExamResultComponent implements OnInit {

  header: Header = new Header();

  isLoading = false;
  isError: boolean;

  requestHeader: RequestHeader = new RequestHeader();
  responseHeader: ResponseHeader = new ResponseHeader();

  keycloakUserInfoRequest: KeycloakUserInfoRequest = new KeycloakUserInfoRequest();
  keycloakUserInfoRequestBody: KeycloakUserInfoRequestBody = new KeycloakUserInfoRequestBody();
  keycloakUserInfoResponse: KeycloakUserInfoResponse = new KeycloakUserInfoResponse();

  constructor(
    private sidebarservice: SidebarService,
    private authService: AuthService,
    private _appStorageService: AppStorageService,
    private toastr: ToastrService,
    private oauthService: OAuthService,
    private route: Router,
    private keycloakUserInfoservice: KeycloakUserInfoService,
  ) { }

  ngOnInit(): void {
    // this.keycloakUserInfo();
    // console.log(this.authService.getClaims());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  keycloakUserInfo() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.keycloakUserInfoRequest.body = this.keycloakUserInfoRequestBody;
    this.keycloakUserInfoRequest.header = this.requestHeader;

    this.keycloakUserInfoservice.getUsers(this.keycloakUserInfoRequest).subscribe(resData => {

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

      }
    }, error => {
      this.isError = true;
      throwError(error);
    });

  }


}
