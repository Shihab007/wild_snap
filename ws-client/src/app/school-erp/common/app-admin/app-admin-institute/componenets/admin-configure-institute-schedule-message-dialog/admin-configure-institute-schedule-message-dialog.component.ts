import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { Location } from '@angular/common';
import { ConstantService } from 'src/app/common/services/constant.service';
import { ConfigureMessageScheduleByInstituteOidRequest } from 'src/app/school-erp/common/shared/request/institute/configure-message-schedule-by-institute-oid-request';
import { ConfigureMessageScheduleByInstituteOidRequestBody } from 'src/app/school-erp/common/shared/request/institute/configure-message-schedule-by-institute-oid-request-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerConfiguration } from 'src/app/school-erp/common/shared/model/ngx-spinner-configuration';

@Component({
  selector: 'app-admin-configure-institute-schedule-message-dialog',
  templateUrl: './admin-configure-institute-schedule-message-dialog.component.html',
  styleUrls: ['./admin-configure-institute-schedule-message-dialog.component.scss']
})
export class AdminConfigureInstituteScheduleMessageDialogComponent implements OnInit {

  public instituteInfoParameter: any = {};


  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  constructor(
    public dialogRef: MatDialogRef<AdminConfigureInstituteScheduleMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _router: Router,
    private _location: Location,
    private _toastr: ToastrService,
    private _instituteService: InstituteService,
    private _translate: TranslateService,
    private _appStorageService: AppStorageService,
    private _spinner: NgxSpinnerService,
    private _constantService: ConstantService
  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }
  public spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();

  header: Header = new Header();

  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.locale = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    });
    this.instituteInfoParameter = this.data.instituteInfoParameter;
    this.instituteInfoParameter.scheduleMessagePush == 'On' ? this.scheduleMessagePushCheck = true : this.scheduleMessagePushCheck = false;
    this.previousScheduleMessagePushCheckPushCheck = this.scheduleMessagePushCheck;
    this.checkLogic();
  }


  public scheduleMessagePushCheck: boolean = false;
  public smsPushCheckValue: boolean;
  onChangeScheduleMessagePush() {
    this.smsPushCheckValue = this.scheduleMessagePushCheck;
    this.scheduleMessagePushCheck = !this.scheduleMessagePushCheck;
    this.checkLogic();

  }

  public previousScheduleMessagePushCheckPushCheck: boolean;
  public isShowSmsSubmitButton: boolean = false;
  checkLogic() {
    if (!this._constantService.isNullOrEmpty(this.instituteInfoParameter.scheduleMessagePush)) {
      if (this.previousScheduleMessagePushCheckPushCheck != this.scheduleMessagePushCheck) {
        this.isShowSmsSubmitButton = true;
      } else {
        this.isShowSmsSubmitButton = false;

      }

    } else {
      this.isShowSmsSubmitButton = false;
    }

  }


  configureMessageScheduleByInstituteOidRequest: ConfigureMessageScheduleByInstituteOidRequest = new ConfigureMessageScheduleByInstituteOidRequest();
  configureMessageScheduleByInstituteOidRequestBody: ConfigureMessageScheduleByInstituteOidRequestBody = new ConfigureMessageScheduleByInstituteOidRequestBody();


  submitScheduleMessageRequest() {
    this.configureMessageScheduleByInstituteOidRequest.body = this.configureMessageScheduleByInstituteOidRequestBody;
    this.configureMessageScheduleByInstituteOidRequest.body.instituteOid = this.instituteInfoParameter.oid;
    this.scheduleMessagePushCheck ? this.configureMessageScheduleByInstituteOidRequest.body.scheduleMessagePush = "On" :
      this.configureMessageScheduleByInstituteOidRequest.body.scheduleMessagePush = "Off";

    console.log("configureMessageScheduleByInstituteOidRequest :");
    console.log(this.configureMessageScheduleByInstituteOidRequest);

    this._instituteService
      .configureMessageScheduleByInstituteOid(this.configureMessageScheduleByInstituteOidRequest)
      .subscribe(data => {
        this._spinner.show();
        if (data.header.responseCode == "200") {
          this._toastr.success('Message Schedule Configured Successfully');
          setTimeout(() => {
            this._spinner.hide();
            window.location.reload();

          }, 1000);

        } else {
          this._spinner.hide();
          this._toastr.error('Error in Configuration');
        }

      });


  }




  cancel() {
    this.dialogRef.close('No');
  }


}
