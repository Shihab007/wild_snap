import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { ConstantService } from 'src/app/common/services/constant.service';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { EducationGradingSystemList } from 'src/app/school-erp/common/shared/model/education/education-grading-system-list';
import { InstituteClassEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-entity';
import { InstituteClassGroupEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-group-entity';
import { InstituteClassSectionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-section-entity';
import { InstituteGradingSystemEntity } from 'src/app/school-erp/common/shared/model/institute/institute-grading-system-entity';
import { InstituteSessionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-session-entity';
import { InstituteShiftEntity } from 'src/app/school-erp/common/shared/model/institute/institute-shift-entity';
import { InstituteVersionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-version-entity';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { GetProfileByLoginIdRequest } from 'src/app/school-erp/common/shared/request/security/get-profile-by-login-id-request';
import { GetProfileByLoginIdRequestBody } from 'src/app/school-erp/common/shared/request/security/get-profile-by-login-id-request-body';
import { GetInstituteInfoResponseBody } from 'src/app/school-erp/common/shared/response/institute/get-institute-info-response-body';
import { GetProfileByLoginIdResponseBody } from 'src/app/school-erp/common/shared/response/security/get-profile-by-login-id-response-body';
import { AppClassGroupService } from 'src/app/school-erp/common/shared/services/class-group/app-class-group.service';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { SecurityService } from 'src/app/school-erp/common/shared/services/security/security.service';


@Component({
  selector: 'app-app-admin-profile',
  templateUrl: './app-admin-profile.component.html',
  styleUrls: ['./app-admin-profile.component.scss']
})
export class AppAdminProfileComponent implements OnInit {

  public userInfo: UserInfo = new UserInfo();
  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();

  constructor(
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _appStorageService: AppStorageService,
    private _securityService: SecurityService,
    private _spinner: NgxSpinnerService,
    private _constantService: ConstantService,
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
        console.log('PROFILE INFO');
        console.log(this.entity);
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
    console.log(routerPath);

    this._router.navigate([routerPath]);
  }

  goBack() {
    this._location.back();
  }

}
