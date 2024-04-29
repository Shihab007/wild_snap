import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { SmsFeatureModel } from 'src/app/school-erp/common/shared/model/sms/sms-feature-model';
import { GetSmsFeatureByOidRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-feature-by-oid-request';
import { GetSmsFeatureByOidRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-feature-by-oid-request-body';
import { SmsFeature } from 'src/app/school-erp/common/shared/services/sms/sms.feature';
@Component({
  selector: 'app-admin-sms-feature-view',
  templateUrl: './admin-sms-feature-view.component.html',
  styleUrls: ['./admin-sms-feature-view.component.scss']
})
export class AdminSmsFeatureViewComponent implements OnInit {

  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public entity: SmsFeatureModel = new SmsFeatureModel();
  public local: any;
  public isShowContactGroupList: boolean = false;

  constructor(
    private _location: Location,
    private _smsFeature: SmsFeature,
    private _router: Router,
    private _translate: TranslateService,
    private toastr: ToastrService,
    private _appStorageService: AppStorageService,
    private _route: ActivatedRoute,
  ) { }

  public requestHeader: RequestHeader = new RequestHeader();
  public getSmsFeatureByOidRequest: GetSmsFeatureByOidRequest = new GetSmsFeatureByOidRequest();
  public getSmsFeatureByOidRequestBody: GetSmsFeatureByOidRequestBody = new GetSmsFeatureByOidRequestBody();

  ngOnInit(): void {
    this.local = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.getSmsFeatureByOid();
  }


  getSmsFeatureByOid() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getSmsFeatureByOidRequest.header = this.requestHeader;
    this.getSmsFeatureByOidRequestBody.oid = this._route.snapshot.params["oid"];
    this.getSmsFeatureByOidRequest.body = this.getSmsFeatureByOidRequestBody;

    this._smsFeature.getSmsFeatureByOid(this.getSmsFeatureByOidRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this.entity = data.body;

        console.log("===================================");
        console.log("  Get Sms Feature By Oid Response  ");
        console.log("===================================");
        console.log(data);
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }



  goBack() {
    this._location.back();

  }

  goToEditPage() {
    this._router.navigate(['/admin/notification/sms-feature/edit/' + this.entity.oid]);
  }

}
