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
import { GetSmsServiceLogListRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-log-list-request';
import { GetSmsServiceLogListRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-log-list-request-body';
import { SmsServiceLogList } from 'src/app/school-erp/common/shared/model/sms/sms-service-log-list';
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';

@Component({
  selector: 'app-admin-institute-sms-service-log-list',
  templateUrl: './admin-institute-sms-service-log-list.component.html',
  styleUrls: ['./admin-institute-sms-service-log-list.component.scss']
})
export class AdminInstituteSmsServiceLogListComponent implements OnInit {


  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public entityList: SmsServiceLogList[];
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
    this.getSmsServiceLogList();
  }

  public isShowComponent: boolean = false;
  public buttonStatePresentService: boolean = false;
  public buttonStateRequesService: boolean = false;
  // public buttonStatePresentServiceOn: boolean = false;
  public buttonStateOff: boolean = false;

  public addressEnObj: AddressEnglish = new AddressEnglish();
  public addressBnObj: AddressBangla = new AddressBangla();
  public institute: InstituteList = new InstituteList();
  public getSmsServiceLogListRequest: GetSmsServiceLogListRequest = new GetSmsServiceLogListRequest();
  public getSmsServiceLogListRequestBody: GetSmsServiceLogListRequestBody = new GetSmsServiceLogListRequestBody();

  getSmsServiceLogList() {

    this.getSmsServiceLogListRequest.body = this.getSmsServiceLogListRequestBody;
    this.getSmsServiceLogListRequestBody.instituteOid = this._route.snapshot.params["oid"];
    this.getSmsServiceLogListRequestBody.status = "Pending";
    this.getSmsServiceLogListRequest.body = this.getSmsServiceLogListRequestBody;

    this._smsServiceLog.getSmsServiceLogList(this.getSmsServiceLogListRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this.entityList = data.body.smsServiceLogList;
        console.log(this.entityList);

        this.institute.nameBn = this.entityList[0].instituteNameEn;
        this.institute.nameBn = this.entityList[0].instituteNameBn;
        this.institute.email = this.entityList[0].instituteEmail;
        this.institute.contact = this.entityList[0].instituteContact;
        this.institute.logoUrl = this.entityList[0].logoUrl;

        if (this.entityList[0].instituteAddressJsonEn == null || this.entityList[0].instituteAddressJsonEn == 'null') {
          this.institute.addressEn = this.addressEnObj;
        } else {
          this.institute.addressEn = JSON.parse(this.entityList[0].instituteAddressJsonEn);
        }
        if (this.entityList[0].instituteAddressJsonBn == null || this.entityList[0].instituteAddressJsonBn == 'null') {
          this.institute.addressBn = this.addressBnObj;
        } else {
          this.institute.addressBn = JSON.parse(this.entityList[0].instituteAddressJsonBn);
        }
        console.log(this.institute);

        this.isShowComponent = true;

        this.entityList.map(res => {
          res.requestedOn = moment(res.requestedOn).format('DD-MM-YYYY hh:mm A');
          res.approvedOn = moment(res.approvedOn).format('DD-MM-YYYY hh:mm A');
          if (res.presentSmsServiceStatus === "On") {
            res.presentStatus = true;
          } else {
            res.presentStatus = false;
          }
          if (res.requestSmsServiceStatus === "On") {

            res.requestedStatus = true;
          } else {
            res.requestedStatus = false;
          }
        })

      }
    },
      (error) => {
        console.log(error);
      }
    );
  }


  public approveSmsServiceRequest: ApproveSmsServiceRequest = new ApproveSmsServiceRequest();
  public approveSmsServiceRequestBody: ApproveSmsServiceRequestBody = new ApproveSmsServiceRequestBody();

  approveSmsService(entity: any) {
    entity.approved = true;

    console.log(entity);
    this.approveSmsServiceRequest.body = this.approveSmsServiceRequestBody;
    this.approveSmsServiceRequest.body.oid = entity.oid;
    this.approveSmsServiceRequest.body.smsServiceOid = entity.smsServiceOid;
    this.approveSmsServiceRequest.body.serviceType = entity.serviceType;
    this.approveSmsServiceRequest.body.requestSmsServiceStatus = entity.requestSmsServiceStatus;
    this.approveSmsServiceRequest.body.approvedBy = this.userInfo.loginId;
    this.approveSmsServiceRequest.body.approvedOn = new Date();
    console.log('approveSmsServiceRequestBody');
    console.log(this.approveSmsServiceRequest);


    this._smsServiceLog.approveSmsService(this.approveSmsServiceRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this._toastr.success('Sms Service Approved Successfully!');
        // this._router.navigate(["/admin/notification/sms-service-setting/list"]);
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

  rejectSmsService(entity: any) {

    console.log(entity);

    entity.rejected = true;

    this.rejectSmsServiceRequest.body = this.rejectSmsServiceRequestBody;
    this.rejectSmsServiceRequest.body.oid = entity.oid;
    this.rejectSmsServiceRequest.body.smsServiceOid = entity.smsServiceOid;
    this.rejectSmsServiceRequest.body.statusType = 'Rejected';
    this.rejectSmsServiceRequest.body.requestSmsServiceStatus = entity.requestSmsServiceStatus;
    this.rejectSmsServiceRequest.body.approvedBy = this.userInfo.loginId;
    this.rejectSmsServiceRequest.body.approvedOn = new Date();
    console.log('rejectSmsServiceRequestBody');
    console.log(this.rejectSmsServiceRequest);


    this._smsServiceLog.rejectSmsService(this.rejectSmsServiceRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this._toastr.success('Sms Service Rejectd Successfully!');
        // this._router.navigate(["/admin/notification/sms-service-setting/list"]);
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

}


