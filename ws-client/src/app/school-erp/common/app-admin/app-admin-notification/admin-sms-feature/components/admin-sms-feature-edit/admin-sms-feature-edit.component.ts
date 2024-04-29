import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { DropdownData } from 'src/app/common/constant/dropdown-data';
import { languageList } from 'src/app/common/constant/list-status';
import { Header } from 'src/app/common/request/base-request';
import { ConstantService } from 'src/app/common/services/constant.service';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ContactGroupList } from 'src/app/school-erp/common/shared/model/contact-group/contact-group-list';
import { TemplateParameter } from 'src/app/school-erp/common/shared/model/notification-message/template-parameter';
import { SmsFeatureModel } from 'src/app/school-erp/common/shared/model/sms/sms-feature-model';
import { SmsServiceContactGroup } from 'src/app/school-erp/common/shared/model/sms/sms-service-contact-group';
import { SmsServiceModel } from 'src/app/school-erp/common/shared/model/sms/sms-service-model';
import { ContactGroupListRequest } from 'src/app/school-erp/common/shared/request/contact-group/contact-group-list-request';
import { ContactGroupListRequestBody } from 'src/app/school-erp/common/shared/request/contact-group/contact-group-list-request-body';
import { GetSmsFeatureByOidRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-feature-by-oid-request';
import { GetSmsFeatureByOidRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-feature-by-oid-request-body';
import { GetSmsServiceByOidRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-by-oid-request';
import { GetSmsServiceByOidRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-by-oid-request-body';
import { SmsFeatureRequest } from 'src/app/school-erp/common/shared/request/sms/sms-feature-request';
import { SmsServiceRequest } from 'src/app/school-erp/common/shared/request/sms/sms-service-request';
import { ContactGroupService } from 'src/app/school-erp/common/shared/services/contact-group/contact-group.service';
import { SmsFeature } from 'src/app/school-erp/common/shared/services/sms/sms.feature';
import { SmsService } from 'src/app/school-erp/common/shared/services/sms/sms.service';
import { AdminSmsParameterListDialogComponent } from '../admin-sms-parameter-list-dialog/admin-sms-parameter-list-dialog.component';
import { GetListCommonRequest } from 'src/app/school-erp/common/shared/request/common/get-list-common-request';
import { GetListCommonRequestBody } from 'src/app/school-erp/common/shared/request/common/get-list-common-request-body';
import { GetMessageTemplateParameterListResponseBody } from 'src/app/school-erp/common/shared/response/notification-message/get-message-template-parameter-list-response-body';
import { NotificationMessageService } from 'src/app/school-erp/common/shared/services/notitfication-message/notification-message.service';

@Component({
  selector: 'app-admin-sms-feature-edit',
  templateUrl: './admin-sms-feature-edit.component.html',
  styleUrls: ['./admin-sms-feature-edit.component.scss']
})
export class AdminSmsFeatureEditComponent implements OnInit {



  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public entity: SmsFeatureModel = new SmsFeatureModel();
  public local: any;
  public languageList: DropdownData[] = languageList;
  public templateParameterList: TemplateParameter[];


  constructor(
    private dialog: MatDialog,
    private _smsFeature: SmsFeature,
    private _router: Router,
    private _translate: TranslateService,
    private _toastr: ToastrService,
    private _appStorageService: AppStorageService,
    private messageTemplateParameterService: NotificationMessageService,
    private _location: Location,
    private _route: ActivatedRoute
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
    this.getSmsFeatureByOid();
    this.getTemplateParameterList();
  }


  public allParameterList: TemplateParameter[] = [];
  public parameterListRequest: GetListCommonRequest = new GetListCommonRequest();
  public parameterListRequestBody: GetListCommonRequestBody = new GetListCommonRequestBody();
  public parameterListResponseBody: GetMessageTemplateParameterListResponseBody = new GetMessageTemplateParameterListResponseBody();

  getTemplateParameterList() {
    this.parameterListRequest.header = this.header;
    this.parameterListRequestBody.instituteOid = this.userInfo.instituteOid;
    this.parameterListRequest.body = this.parameterListRequestBody;

    this.messageTemplateParameterService.getMessageTemplateParameterList(this.parameterListRequest).subscribe(data => {
      this.allParameterList = data.body.messageTemplateParameterList;
    });
  }


  public requestHeader: RequestHeader = new RequestHeader();
  public getSmsFeatureByOidRequest: GetSmsFeatureByOidRequest = new GetSmsFeatureByOidRequest();
  public getSmsFeatureByOidRequestBody: GetSmsFeatureByOidRequestBody = new GetSmsFeatureByOidRequestBody();


  dropIntoEmailEn(ev: any) {
    let myText = this.entity.emailTemplateTextEn + ev.dataTransfer.getData("text");
    this.entity.emailTemplateTextEn = myText;
    ev.preventDefault();

  }

  dropIntoEmailBn(ev: any) {
    let myText = this.entity.emailTemplateTextBn + ev.dataTransfer.getData("text");
    this.entity.emailTemplateTextBn = myText;
    ev.preventDefault();

  }

  dropIntoSMSEn(ev: any) {
    let myText = this.entity.smsTemplateTextEn + ev.dataTransfer.getData("text");
    this.entity.smsTemplateTextEn = myText;
    ev.preventDefault();
  }

  dropIntoSMSBn(ev: any) {
    let myText = this.entity.smsTemplateTextBn + ev.dataTransfer.getData("text");
    this.entity.smsTemplateTextBn = myText;
    ev.preventDefault();
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
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

        this.templateParameterList = JSON.parse(this.entity.messageParameterJson);
        if (this.tempData.length > 0) {
          this.isShowContactGroupTable = true;
        } else {
          this.isShowContactGroupTable = false;
        }
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





  public tempData = [

  ];
  public isShowContactGroupTable: boolean = false;




  goBack() {

    this._location.back();
  }



  isValidData() {

    return true;
  }


  updateSmsFeatureInfoRequest: SmsFeatureRequest = new SmsFeatureRequest();
  updateSmsFeatureInfoRequestBody: SmsFeatureModel = new SmsFeatureModel();

  updateSmsService() {
    if (!this.isValidData()) {
      return;
    }
    this.entity.messageParameterJson = JSON.stringify(this.templateParameterList);
    this.updateSmsFeatureInfoRequest.body = this.entity;
    this.updateSmsFeatureInfoRequest.body.oid = this._route.snapshot.params["oid"];
    console.log('updateSmsFeatureInfoRequest');
    console.log(this.updateSmsFeatureInfoRequest);

    this._smsFeature.updateSmsFeatureInfo(this.updateSmsFeatureInfoRequest).subscribe(data => {
      console.log('updateSmsFeatureInfoResponse');
      console.log(data);
      if (data.header.responseCode == "200") {
        this._toastr.success(' Sms Feature Updated Successfully');
        this._router.navigate(['/admin/notification/sms-feature/list']);
      } else {
        this._toastr.error('Error in save');
      }
    });


  }

  message: boolean;
  filterParameterList() {
    this.message = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "71%";
    dialogConfig.data = { "allParameterList": this.allParameterList, "selectedParameterList": this.templateParameterList };
    this.dialog.open(AdminSmsParameterListDialogComponent, dialogConfig).afterClosed().subscribe(res => {

      if (res != 'No') {
        this.templateParameterList = [];
        res.map(res => {
          var check = this.templateParameterList.find(x => x.oid === res.oid);
          if (!check)
            this.templateParameterList.push(res);
        })
      }
    });
  }
}
