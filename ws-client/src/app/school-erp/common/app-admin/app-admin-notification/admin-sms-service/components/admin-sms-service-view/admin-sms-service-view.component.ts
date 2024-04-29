import { Component, OnInit } from '@angular/core';
import { GetSmsServiceListRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-list-request';
import { GetSmsServiceListRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-list-request-body';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { Location } from '@angular/common';
import { SmsServiceLogList } from 'src/app/school-erp/common/shared/model/sms/sms-service-log-list';
import { SmsService } from 'src/app/school-erp/common/shared/services/sms/sms.service';
import { InstituteSmsServiceModel } from 'src/app/school-erp/common/shared/model/sms/institute-sms-service-model';
import { SmsServiceModel } from 'src/app/school-erp/common/shared/model/sms/sms-service-model';
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';
import { AddressEnglish } from 'src/app/school-erp/common/shared/model/address/address-english';
import { AddressBangla } from 'src/app/school-erp/common/shared/model/address/address-bangla';
import { SmsFeature } from 'src/app/school-erp/common/shared/services/sms/sms.feature';
import { GetSmsFeatureListRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-feature-list-request';
import { GetSmsFeatureListRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-feature-list-request-body';
import { SmsFeatureList } from 'src/app/school-erp/common/shared/model/sms/sms-feature-list';
import { SaveSmsServiceRequest } from 'src/app/school-erp/common/shared/request/sms/save-sms-service-request';
import { SaveSmsServiceRequestBody } from 'src/app/school-erp/common/shared/request/sms/save-sms-service-request-body';

@Component({
  selector: 'app-admin-sms-service-view',
  templateUrl: './admin-sms-service-view.component.html',
  styleUrls: ['./admin-sms-service-view.component.scss']
})
export class AdminSmsServiceViewComponent implements OnInit {

  header: Header = new Header();

  requestHeader: RequestHeader = new RequestHeader();

  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  instituteSmsServiceList: InstituteSmsServiceModel[];

  smsFeatureList: SmsFeatureList[];
  newSmsFeatureList: SmsFeatureList[];
  smsServiceList: SmsServiceModel[];
  instituteSmsServiceDetail: InstituteSmsServiceModel = new InstituteSmsServiceModel();
  institute = new InstituteList();

  public addressEnObj: AddressEnglish = new AddressEnglish();
  public addressBnObj: AddressBangla = new AddressBangla();
  constructor(
    private _location: Location,
    private _smsService: SmsService,
    private _smsFeatureService: SmsFeature,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private _appStorageService: AppStorageService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;

    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });

    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.getInstituteWiseSmsServiceList();

  }
  public getSmsFeatureListRequest: GetSmsFeatureListRequest = new GetSmsFeatureListRequest();
  public getSmsFeatureListRequestBody: GetSmsFeatureListRequestBody = new GetSmsFeatureListRequestBody();

  getSMSFeatureList() {
    this.getSmsFeatureListRequest.body = this.getSmsFeatureListRequestBody;
    // this.getSmsFeatureListRequest.body.instituteOid = this.userInfo.instituteOid;
    console.log("messageTemplateList list Request body :");
    console.log(this.getSmsFeatureListRequest);

    this._smsFeatureService.getInstituteSmsFeatureList(this.getSmsFeatureListRequest).subscribe(data => {
      console.log('messageTemplateList list');
      console.log(data.body.smsFeatureList);
      this.smsFeatureList = data.body.smsFeatureList;
      this.smsFeatureList.map(res => {

        res.checked = false;
        var check = this.smsServiceList.find(x => x.smsFeatureOid == res.oid);
        if (check)
          res.checked = true;
      });
    });
  }

  show: boolean;
  public instituteSmsServiceListRequest = new GetSmsServiceListRequest();
  public GetSmsServiceListRequestBody = new GetSmsServiceListRequestBody();
  getInstituteWiseSmsServiceList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.instituteSmsServiceListRequest.header = this.requestHeader;
    this.instituteSmsServiceListRequest.body = this.GetSmsServiceListRequestBody;
    this.instituteSmsServiceListRequest.body.instituteOid = this._route.snapshot.params["oid"];
    this._smsService.getInstituteSmsServiceInfo(this.instituteSmsServiceListRequest).subscribe((data) => {
      console.log("*********************Get Institute wise sms service info List Response ******************** ");
      console.log(data);

      this.instituteSmsServiceDetail = data.body.instituteSmsServiceList[0];
      this.smsServiceList = this.instituteSmsServiceDetail.smsServiceList;
      this.institute = this.instituteSmsServiceDetail.institute;
      if (
        this.institute.addressJsonEn == null ||
        this.institute.addressJsonEn == 'null'
      ) {
        this.institute.addressEn = this.addressEnObj;
      } else {
        this.institute.addressEn = JSON.parse(
          this.institute.addressJsonEn
        );
      }
      if (this.institute.addressJsonBn == null || this.institute.addressJsonBn == 'null') {
        this.institute.addressBn = this.addressBnObj;
      } else {
        this.institute.addressBn = JSON.parse(
          this.institute.addressJsonBn
        );
      }



      this.show = true;

      this.getSMSFeatureList();
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });

  }

  saveSmsServiceRequest = new SaveSmsServiceRequest();
  saveSmsServiceRequestBody = new SaveSmsServiceRequestBody();
  newSmsServiceList: SmsServiceModel[];
  saveSmsService() {

    this.newSmsFeatureList = [];
    this.smsFeatureList.map(res => {
      if (res.checked == true) {
        var check = this.smsServiceList.find(x => x.smsFeatureOid == res.oid);
        if (!check) {
          this.newSmsFeatureList.push(res);
        }
      }
    });

    this.newSmsServiceList = [];
    this.newSmsFeatureList.map(res => {
      var sms = new SmsServiceModel();
      sms.nameEn = res.nameEn;
      sms.nameBn = res.nameBn;
      sms.smsTemplateName = res.smsTemplateName;
      sms.smsTemplateTextEn = res.smsTemplateTextEn;
      sms.smsTemplateTextBn = res.smsTemplateTextBn;
      sms.smsLanguage = res.smsLanguage;
      sms.emailSubject = res.emailSubject;
      sms.emailTemplateTextEn = res.emailTemplateTextEn;
      sms.emailTemplateTextBn = res.emailTemplateTextBn;
      sms.emailLanguage = res.emailLanguage;
      sms.messageParameterJson = res.messageParameterJson;
      sms.applicableFor = res.applicableFor
      sms.remarks = res.remarks;
      sms.status = res.status;
      sms.smsFeatureOid = res.oid;
      sms.smsPush = "Off";
      sms.emailPush = "Off";
      this.newSmsServiceList.push(sms);
    });


    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.saveSmsServiceRequest.header = this.requestHeader;
    this.saveSmsServiceRequest.body = this.saveSmsServiceRequestBody;
    this.saveSmsServiceRequest.body.instituteOid = this._route.snapshot.params["oid"];
    this.saveSmsServiceRequest.body.smsServiceList = this.newSmsServiceList;


    this._smsService.saveSmsServiceInfo(this.saveSmsServiceRequest).subscribe((data) => {
      console.log('updateSmsFeatureInfoResponse');
      console.log(data);
      if (data.header.responseCode == "200") {
        this.toastr.success(' Sms Feature Updated Successfully');
        this.router.navigate(['/admin/notification/sms-service/list']);
      } else {
        this.toastr.error('Error in save');
      }
    });


  }
  goBack() {
    this._location.back();

  }
}
