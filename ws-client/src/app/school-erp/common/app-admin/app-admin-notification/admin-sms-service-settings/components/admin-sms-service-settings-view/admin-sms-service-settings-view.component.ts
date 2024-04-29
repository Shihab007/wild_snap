import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { SmsService } from 'src/app/school-erp/common/shared/services/sms/sms.service';
import { ConstantService } from 'src/app/common/services/constant.service';
import { GetSmsServiceLogByOidResponseBody } from 'src/app/school-erp/common/shared/response/sms/get-sms-service-log-by-oid-response-body';
import { GetByOidCommonRequest } from 'src/app/school-erp/common/shared/request/common/get-by-oid-common-request';
import { GetByOidCommonRequestBody } from 'src/app/school-erp/common/shared/request/common/get-by-oid-common-request-body';

import * as moment from 'moment';
import { ApproveSmsServiceRequest } from 'src/app/school-erp/common/shared/request/sms/approve-sms-service-request';
import { ApproveSmsServiceRequestBody } from 'src/app/school-erp/common/shared/request/sms/approve-sms-service-request-body';
import { RejectSmsServiceRequest } from 'src/app/school-erp/common/shared/request/sms/reject-sms-service-request';
import { RejectSmsServiceRequestBody } from 'src/app/school-erp/common/shared/request/sms/reject-sms-service-request-body';
import { AddressEnglish } from 'src/app/school-erp/common/shared/model/address/address-english';
import { AddressBangla } from 'src/app/school-erp/common/shared/model/address/address-bangla';

@Component({
  selector: 'app-admin-sms-service-settings-view',
  templateUrl: './admin-sms-service-settings-view.component.html',
  styleUrls: ['./admin-sms-service-settings-view.component.scss']
})
export class AdminSmsServiceSettingsViewComponent implements OnInit {


  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public entity: GetSmsServiceLogByOidResponseBody = new GetSmsServiceLogByOidResponseBody();
  public local: any;
  public isSmsServiceApproved: boolean = false;



  constructor(
    private _location: Location,
    private _smsServiceLog: SmsService,
    private _router: Router,
    private _translate: TranslateService,
    private _toastr: ToastrService,
    private _appStorageService: AppStorageService,
    private _route: ActivatedRoute,
  ) { }

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
    this.getSmsServiceLogByOid();
  }


  public buttonStatePresentService: boolean = false;
  public buttonStateRequesService: boolean = false;
  // public buttonStatePresentServiceOn: boolean = false;
  public buttonStateOff: boolean = false;

  public addressEnObj: AddressEnglish = new AddressEnglish();
  public addressBnObj: AddressBangla = new AddressBangla();

  public getSmsServiceLogByOidRequest: GetByOidCommonRequest = new GetByOidCommonRequest();
  public getSmsServiceLogByOidRequestBody: GetByOidCommonRequestBody = new GetByOidCommonRequestBody();

  getSmsServiceLogByOid() {

    this.getSmsServiceLogByOidRequest.body = this.getSmsServiceLogByOidRequestBody;
    this.getSmsServiceLogByOidRequestBody.oid = this._route.snapshot.params["oid"];
    this.getSmsServiceLogByOidRequest.body = this.getSmsServiceLogByOidRequestBody;

    this._smsServiceLog.getSmsServiceLogByOid(this.getSmsServiceLogByOidRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this.entity = data.body;

        if (
          this.entity.addressJsonEn == null ||
          this.entity.addressJsonEn == 'null'
        ) {
          this.entity.addressEn = this.addressEnObj;
        } else {
          this.entity.addressEn = JSON.parse(
            this.entity.addressJsonEn
          );
        }
        if (
          this.entity.addressJsonBn == null ||
          this.entity.addressJsonBn == 'null'
        ) {
          this.entity.addressBn = this.addressBnObj;
        } else {
          this.entity.addressBn = JSON.parse(
            this.entity.addressJsonBn
          );
        }
        this.entity.status == 'Approved' ? this.isSmsServiceApproved = true : this.isSmsServiceApproved = false;
        console.log("===================================");
        console.log("  Get Sms Service Log By Oid Response  ");
        console.log("===================================");
        console.log(data);
        this.entity.requestedOn = moment(this.entity.requestedOn).format('DD-MM-YYYY hh:mm A');
        this.entity.approvedOn = moment(this.entity.approvedOn).format('DD-MM-YYYY hh:mm A');
        this.entity.presentSmsServiceStatus === 'Off' ? this.buttonStatePresentService = false : this.buttonStatePresentService = true;
        this.entity.requestSmsServiceStatus === 'Off' ? this.buttonStateRequesService = false : this.buttonStateRequesService = true;

      }
    },
      (error) => {
        console.log(error);
      }
    );
  }


  public approveSmsServiceRequest: ApproveSmsServiceRequest = new ApproveSmsServiceRequest();
  public approveSmsServiceRequestBody: ApproveSmsServiceRequestBody = new ApproveSmsServiceRequestBody();

  approveSmsService() {

    this.approveSmsServiceRequest.body = this.approveSmsServiceRequestBody;
    this.approveSmsServiceRequest.body.oid = this._route.snapshot.params["oid"];
    this.approveSmsServiceRequest.body.smsServiceOid = this.entity.smsServiceOid;
    this.approveSmsServiceRequest.body.serviceType = this.entity.serviceType;
    this.approveSmsServiceRequest.body.requestSmsServiceStatus = this.entity.requestSmsServiceStatus;
    this.approveSmsServiceRequest.body.approvedBy = this.userInfo.loginId;
    this.approveSmsServiceRequest.body.approvedOn = new Date();
    console.log('approveSmsServiceRequestBody');
    console.log(this.approveSmsServiceRequest);


    this._smsServiceLog.approveSmsService(this.approveSmsServiceRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this._toastr.success('Sms Service Approved Successfully!');
        this._router.navigate(["/admin/notification/sms-service-setting/list"]);
      } else {
        this._toastr.error('Error in Approve');
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }


  public rejectSmsServiceRequest: RejectSmsServiceRequest = new RejectSmsServiceRequest();
  public rejectSmsServiceRequestBody: RejectSmsServiceRequestBody = new RejectSmsServiceRequestBody();

  rejectSmsService() {

    this.rejectSmsServiceRequest.body = this.rejectSmsServiceRequestBody;
    this.rejectSmsServiceRequest.body.oid = this._route.snapshot.params["oid"];
    this.rejectSmsServiceRequest.body.smsServiceOid = this.entity.smsServiceOid;
    this.rejectSmsServiceRequest.body.statusType = 'Rejected';
    this.rejectSmsServiceRequest.body.requestSmsServiceStatus = this.entity.requestSmsServiceStatus;
    this.rejectSmsServiceRequest.body.approvedBy = this.userInfo.loginId;
    this.rejectSmsServiceRequest.body.approvedOn = new Date();
    console.log('rejectSmsServiceRequestBody');
    console.log(this.rejectSmsServiceRequest);


    this._smsServiceLog.rejectSmsService(this.rejectSmsServiceRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this._toastr.success('Sms Service Rejectd Successfully!');
        this._router.navigate(["/admin/notification/sms-service-setting/list"]);
      } else {
        this._toastr.error('Error in Reject');
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }

  goToViewLogPage(oid: string) {
    let routerPath = 'school/notification/sms-service/log-view/';
    this._router.navigate([routerPath, oid]);
  }


  goBack() {
    this._location.back();

  }

  goToEditPage() {
    this._router.navigate(['/school/notification/sms-service/edit/' + this.entity.oid]);
  }

}


