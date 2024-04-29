import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { GetProfileByLoginIdRequest } from 'src/app/school-erp/common/shared/request/security/get-profile-by-login-id-request';
import { GetProfileByLoginIdRequestBody } from 'src/app/school-erp/common/shared/request/security/get-profile-by-login-id-request-body';
import { GetProfileByLoginIdResponseBody } from 'src/app/school-erp/common/shared/response/security/get-profile-by-login-id-response-body';
import { SecurityService } from 'src/app/school-erp/common/shared/services/security/security.service';

@Component({
  selector: 'app-school-profile-view',
  templateUrl: './school-profile-view.component.html',
  styleUrls: ['./school-profile-view.component.scss']
})
export class SchoolProfileViewComponent implements OnInit {
  public userInfo: UserInfo = new UserInfo();
  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();

  constructor(
    private _toastr: ToastrService,
    private _appStorageService: AppStorageService,
    private _securityService: SecurityService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.getProfileByLoginId();
  }

  public getProfileByLoginIdRequest: GetProfileByLoginIdRequest = new GetProfileByLoginIdRequest();
  public getProfileByLoginIdRequestBody: GetProfileByLoginIdRequestBody = new GetProfileByLoginIdRequestBody();
  public entity: GetProfileByLoginIdResponseBody = new GetProfileByLoginIdResponseBody();

  getProfileByLoginId() {

    this.getProfileByLoginIdRequest.body = this.getProfileByLoginIdRequestBody;
    this.getProfileByLoginIdRequest.body.loginId = this.userInfo.loginId;
    this._spinner.show();
    this._securityService.getProfileByLoginId(this.getProfileByLoginIdRequest).subscribe((data) => {
      this._spinner.hide();
      if (data.header.responseCode == "200") {
        this.entity = data.body;
      }
    }, (error) => {
      this._spinner.hide();
      this._toastr.error(error.Message);
      console.log(error);
    }
    );
  }

  goToEditPage() {
    var routerPath = '/school/profile/edit';
    this._router.navigate([routerPath]);
  }

  goBack() {
    this._location.back();
  }

}
