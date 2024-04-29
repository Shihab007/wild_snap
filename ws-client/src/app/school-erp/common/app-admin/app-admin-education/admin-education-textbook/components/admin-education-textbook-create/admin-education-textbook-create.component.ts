import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { DropdownData } from 'src/app/common/constant/dropdown-data';
import { activeStatusList, assetNatureList, assetTypeList } from 'src/app/common/constant/list-status';
import { Header } from 'src/app/common/request/base-request';
import { ConstantService } from 'src/app/common/services/constant.service';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { EducationClassEntity } from 'src/app/school-erp/common/shared/model/education/education-class-entity';
import { EducationCurriculumEntity } from 'src/app/school-erp/common/shared/model/education/education-curriculum-entity';
import { EducationGroupEntity } from 'src/app/school-erp/common/shared/model/education/education-group-entity';
import { EducationMediumEntity } from 'src/app/school-erp/common/shared/model/education/education-medium-entity';
import { EducationSession } from 'src/app/school-erp/common/shared/model/education/education-session';
import { EducationSystemEntity } from 'src/app/school-erp/common/shared/model/education/education-system-entity';
import { EducationTypeEntity } from 'src/app/school-erp/common/shared/model/education/education-type-entity';
import { InstituteSubjectList } from 'src/app/school-erp/common/shared/model/education/institute-subject-list';
import { NgxSpinnerConfiguration } from 'src/app/school-erp/common/shared/model/ngx-spinner-configuration';
import { EducationTextbook } from 'src/app/school-erp/common/shared/model/textbook/education-textbook';
import { EducationTextbookVersion } from 'src/app/school-erp/common/shared/model/textbook/education-textbook-version';
import { GetEducationClassListBySessionRequest } from 'src/app/school-erp/common/shared/request/education/get-education-class-list-by-session-request';
import { GetEducationClassListBySessionRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-class-list-by-session-request-body';
import { GetEducationGroupListBySessionRequest } from 'src/app/school-erp/common/shared/request/education/get-education-group-list-by-session-request';
import { GetEducationGroupListBySessionRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-group-list-by-session-request-body';
import { GetEducationInfoRequest } from 'src/app/school-erp/common/shared/request/education/get-education-info-request';
import { GetEducationInfoRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-info-request-body';
import { GetEducationSessionListRequest } from 'src/app/school-erp/common/shared/request/education/get-education-session-list-request';
import { GetEducationSessionListRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-session-list-request-body';
import { GetInstituteSubjectListRequest } from 'src/app/school-erp/common/shared/request/education/get-institute-subject-list-request';
import { GetInstituteSubjectListRequestBody } from 'src/app/school-erp/common/shared/request/education/get-institute-subject-list-request-body';
import { CheckExistingEducationRequest } from 'src/app/school-erp/common/shared/request/textbook/check-existing-education-request';
import { CheckExistingEducationRequestBody } from 'src/app/school-erp/common/shared/request/textbook/check-existing-education-request-body';
import { EducationTextbookCreateRequest } from 'src/app/school-erp/common/shared/request/textbook/education-textbook-create-request';
import { EducationTextbookCreateRequestBody } from 'src/app/school-erp/common/shared/request/textbook/education-textbook-create-request-body';
import { EducationTextbookListBySessionRequest } from 'src/app/school-erp/common/shared/request/textbook/education-textbook-list-by-session-request';
import { EducationTextbookListBySessionRequestBody } from 'src/app/school-erp/common/shared/request/textbook/education-textbook-list-by-session-request-body';
import { GetEducationInfoResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-info-response-body';
import { EducationTextbookListBySessionResponseBody } from 'src/app/school-erp/common/shared/response/textbook/education-textbook-list-by-session-response-body';
import { EducationClassService } from 'src/app/school-erp/common/shared/services/education/education-class.service';
import { EducationGroupService } from 'src/app/school-erp/common/shared/services/education/education-group.service';
import { EducationSessionService } from 'src/app/school-erp/common/shared/services/education/education-session.service';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';
import { TextbookService } from 'src/app/school-erp/common/shared/services/textbook/textbook.service';
const moment = _moment;
@Component({
  selector: 'app-admin-education-textbook-create',
  templateUrl: './admin-education-textbook-create.component.html',
  styleUrls: ['./admin-education-textbook-create.component.scss']
})
export class AdminEducationTextbookCreateComponent implements OnInit {

  constructor(
    private _router: Router,
    private _location: Location,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _appStorageService: AppStorageService,
    private _textbookService: TextbookService,
    private _educationService: EducationService,
    private _educationSessionService: EducationSessionService,
    private _educationClassService: EducationClassService,
    private _educationGroupService: EducationGroupService,
    private _constantService: ConstantService,
    private _spinner: NgxSpinnerService
  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }
  public spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();


  @ViewChild('nameEn') nameEn: any;
  @ViewChild('nameBn') nameBn: any;
  @ViewChild('assetType') assetType: any;
  @ViewChild('founded') founded: any;
  @ViewChild('assetNature') assetNature: any;
  @ViewChild('quantity') quantity: any;
  @ViewChild('status') status: any;
  @ViewChild('remarks') remarks: any;


  activeStatusList: DropdownData[] = activeStatusList;
  assetTypeList: DropdownData[] = assetTypeList;
  assetNatureList: DropdownData[] = assetNatureList;

  public locale: any;
  public userInfo: UserInfo = new UserInfo();
  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();


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

    this.getEducationInformation();

  }

  public selectedEducationMediumOid: string;
  public selectedEducationCurriculumOid: string;
  public selectedEducationSystemOid: string;
  public selectedEducationSessionOid: string;
  public selectedEducationClassOid: string;


  public educationInfo: GetEducationInfoResponseBody = new GetEducationInfoResponseBody();

  public educationMediumList: EducationMediumEntity[];
  public educationCurriculumList: EducationCurriculumEntity[];
  public educationSystemList: EducationSystemEntity[];
  public educationTypeList: EducationTypeEntity[] = [];
  public getEducationInfoRequest: GetEducationInfoRequest = new GetEducationInfoRequest();
  public getEducationInfoRequestBody: GetEducationInfoRequestBody = new GetEducationInfoRequestBody();

  getEducationInformation() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getEducationInfoRequest.header = this.requestHeader;
    this.getEducationInfoRequest.body = this.getEducationInfoRequestBody;
    this._spinner.show();
    this._educationService.getEducationInfo(this.getEducationInfoRequest)
      .subscribe(response => {
        this._spinner.hide();
        if (response.header.responseCode === "200") {
          this.educationInfo = response.body;

          this.educationMediumList = response.body.educationMediumList;
        }
      },
        (error) => {
          console.log(error);
          this._spinner.hide();
          this._toastr.error(error.Message);
        }
      );
  }

  changeMedium(event: any) {
    this.educationCurriculumList = [];
    this.educationCurriculumList = this.educationInfo.educationCurriculumList.filter(el => el.educationMediumOid == event);
    console.log(this.educationCurriculumList);

  }

  changeCurriculum(event: any) {
    this.educationTypeList = [];
    this.educationSystemList = this.educationInfo.educationSystemList.filter(el => el.educationCurriculumOid == event);
  }



  public educationSessionList: EducationSession[];
  getEducationSessionListRequest: GetEducationSessionListRequest = new GetEducationSessionListRequest();
  getEducationSessionListRequestBody: GetEducationSessionListRequestBody = new GetEducationSessionListRequestBody();
  getEducationSessionList() {
    this.getEducationSessionListRequest.body = this.getEducationSessionListRequestBody;
    this.getEducationSessionListRequest.body.educationSystemOid = this.selectedEducationSystemOid;
    this.getEducationSessionListRequest.body.educationCurriculumOid = this.selectedEducationCurriculumOid;
    console.log('getEducationSessionListRequest');
    console.log(this.getEducationSessionListRequest);

    this._spinner.show();
    this._educationSessionService.educationSessionList(this.getEducationSessionListRequest).subscribe(data => {
      this._spinner.hide();
      console.log("---------------------------education session list------------------------");
      console.log(data.body);
      this.educationSessionList = data.body.educationSessionList;
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      })
  }



  public educationClassList: EducationClassEntity[];
  getEducationClassListBySessionRequest: GetEducationClassListBySessionRequest = new GetEducationClassListBySessionRequest();
  getEducationClassListBySessionRequestBody: GetEducationClassListBySessionRequestBody = new GetEducationClassListBySessionRequestBody();

  getEducationClassListBySession() {
    this.getEducationClassListBySessionRequest.body = this.getEducationClassListBySessionRequestBody;
    this.getEducationClassListBySessionRequest.body.educationSessionOid = this.selectedEducationSessionOid;
    // this.getEducationClassListBySessionRequest.body.educationCurriculumOid = this.selectedEducationCurriculumOid;
    console.log('getEducationClassListBySessionRequest');
    console.log(this.getEducationClassListBySessionRequest);

    this._spinner.show();
    this._educationClassService.getEducationClassListBySession(this.getEducationClassListBySessionRequest).subscribe(data => {
      this._spinner.hide();
      console.log("---------------------------education class list------------------------");
      console.log(data.body);
      this.educationClassList = data.body.classList;
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      })
  }



  getInstituteSubjectListRequest: GetInstituteSubjectListRequest = new GetInstituteSubjectListRequest();
  getInstituteSubjectListRequestBody: GetInstituteSubjectListRequestBody = new GetInstituteSubjectListRequestBody();
  public educationSubjectList: InstituteSubjectList[];

  getEducationSubjectList() {
    this.getInstituteSubjectListRequest.body = this.getInstituteSubjectListRequestBody;
    this.getInstituteSubjectListRequest.body.educationSystemOid = this.selectedEducationSystemOid;
    this.getInstituteSubjectListRequest.body.educationCurriculumOid = this.selectedEducationCurriculumOid;
    console.log("Education Subject list Request body :");
    console.log(this.getInstituteSubjectListRequest);
    this._spinner.show();
    this._educationService.getAllSubjectList(this.getInstituteSubjectListRequest).subscribe(data => {
      this._spinner.hide();
      this.educationSubjectList = data.body.subjectList;
      console.log('Education Subject list Response body');
      console.log(this.educationSubjectList);
      this.getEducationGroupListBySession();

    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      });


  }




  public ishShowGroup: boolean = false;
  public educationGroupList: EducationGroupEntity[];
  public getEducationGroupListBySessionRequest: GetEducationGroupListBySessionRequest = new GetEducationGroupListBySessionRequest();
  public getEducationGroupListBySessionRequestBody: GetEducationGroupListBySessionRequestBody = new GetEducationGroupListBySessionRequestBody();

  getEducationGroupListBySession() {
    this.getEducationGroupListBySessionRequest.body = this.getEducationGroupListBySessionRequestBody;
    this.getEducationGroupListBySessionRequest.body.educationSessionOid = this.selectedEducationSessionOid;
    this.getEducationGroupListBySessionRequest.body.educationClassOid = this.selectedEducationClassOid;
    console.log('getEducationGroupListBySessionRequest');
    console.log(this.getEducationGroupListBySessionRequest);

    this._spinner.show();
    this._educationGroupService.getEducationGroupListBySession(this.getEducationGroupListBySessionRequest).subscribe(data => {
      this._spinner.hide();
      console.log("---------------------------education group list------------------------");
      console.log(data.body);
      this.educationGroupList = data.body.educationGroupList;
      if (this.educationGroupList.length > 0) {
        this.ishShowGroup = true;
      } else {
        this.ishShowGroup = false;
      }

      this.getEducationTextbookListBySession();
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      })
  }




  educationTextbookListBySession: EducationTextbookListBySessionResponseBody;
  educationTextbookVersionList: EducationTextbookVersion[];
  educationTextbookList: EducationTextbook[];
  educationTextbookListBySessionRequest: EducationTextbookListBySessionRequest = new EducationTextbookListBySessionRequest;
  educationTextbookListBySessionRequestBody: EducationTextbookListBySessionRequestBody = new EducationTextbookListBySessionRequestBody;

  getEducationTextbookListBySession() {

    this.educationTextbookListBySessionRequest.body = this.educationTextbookListBySessionRequestBody;
    this.educationTextbookListBySessionRequest.body.educationMediumOid = this.selectedEducationMediumOid;
    this.educationTextbookListBySessionRequest.body.educationClassOid = this.selectedEducationClassOid;
    this.educationTextbookListBySessionRequest.body.educationCurriculumOid = this.selectedEducationCurriculumOid;
    this.educationTextbookListBySessionRequest.body.educationSessionOid = this.selectedEducationSessionOid;
    this.educationTextbookListBySessionRequest.body.educationPreviousSessionOid = this.selectedEducationSessionOid;

    console.log('Education Textbook List By Session Request');
    console.log(this.educationTextbookListBySessionRequest);
    this._spinner.show();
    this._textbookService.getEducationTextbookListBySession(this.educationTextbookListBySessionRequest).subscribe(data => {
      this._spinner.hide();
      console.log('Education Textbook List By Session Response');

      this.educationTextbookListBySession = data.body;
      this.educationTextbookVersionList = this.educationTextbookListBySession.educationVersionList;
      this.educationTextbookVersionList.forEach((element) => {
        element.educationTextbookList.forEach((obj) => {
          obj.isNewlyAddedData = false;
          obj.isDeleteData = false;
        })
      })
      console.log(this.educationTextbookListBySession);
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      });
  }




  checkExistingEducationTextbookRequest: CheckExistingEducationRequest = new CheckExistingEducationRequest;
  checkExistingEducationTextbookRequestBody: CheckExistingEducationRequestBody = new CheckExistingEducationRequestBody;

  checkExistingEducationTextbook(educationTextbook: any, i: number, j: number) {
    if (!this._constantService.isNullOrEmpty(educationTextbook.oid)) {

      this.checkExistingEducationTextbookRequest.body = this.checkExistingEducationTextbookRequestBody;
      this.checkExistingEducationTextbookRequest.body.oid = educationTextbook.oid;

      this._spinner.show();
      this._textbookService.checkExistingEducationTextbook(this.checkExistingEducationTextbookRequest).subscribe(data => {
        this._spinner.hide();
        if (data.body.educationTextBookLength > 0) {
          this._toastr.error("Can Not Delete This Data!")
        } else {
          this.deleteByRows(i, j);
        }

      },
        (error) => {
          console.log(error);
          this._spinner.hide();
          this._toastr.error(error.Message);
        });
    } else {
      this.deleteByRows(i, j);
    }

  }




  educationTextbook: EducationTextbook = new EducationTextbook;

  addByRows(index: any) {
    this.educationTextbook = new EducationTextbook();
    this.educationTextbook.isNewlyAddedData = true;
    this.educationTextbook.isDeleteData = false;
    this.educationTextbook.educationVersionOid = this.educationTextbookVersionList[index].oid;
    this.educationTextbookVersionList[index].educationTextbookList.push(this.educationTextbook);
  }



  public deleteEducationTextbookList: EducationTextbook[] = [];
  deleteByRows(i: number, j: number) {
    if (this.educationTextbookVersionList[i].educationTextbookList.length > 1) {
      this.educationTextbookVersionList[i].educationTextbookList[j].isDeleteData = true;
      this.deleteEducationTextbookList.push(this.educationTextbookVersionList[i].educationTextbookList[j]);
      this.educationTextbookVersionList[i].educationTextbookList.splice(j, 1);
      var tempBy: EducationTextbook[];
      tempBy = this.educationTextbookVersionList[i].educationTextbookList;
      this.educationTextbookVersionList[i].educationTextbookList = [];

      tempBy.forEach(data => {
        var object = new EducationTextbook();
        object = data;
        this.educationTextbookVersionList[i].educationTextbookList.push(object)
      });
    }
  }




  onSelectSubject(event: any, i: any, j: any) {
    this.educationTextbookVersionList[i].educationTextbookList[j].subjectCode = event.subjectCode;
    this.educationTextbookVersionList[i].educationTextbookList[j].textbookType = event.textbookType;
  }




  // isValidData() {

  //   if (!this.entity.nameEn) {
  //     this._toastr.error('Please! Enter EducationTextbook Name(English)');
  //     this.nameEn.nativeElement.focus();
  //     return false;
  //   }
  //   if (!this.entity.nameBn) {
  //     this._toastr.error('Please! Enter EducationTextbook Name(Bangla)');
  //     this.nameBn.nativeElement.focus();
  //     return false;
  //   }
  //   if (!this.entity.assetType) {
  //     this._toastr.error('Please! Select EducationTextbook Type');
  //     this.assetType.nativeElement.focus();
  //     return false;
  //   }
  //   if (!this.entity.assetNature) {
  //     this._toastr.error('Please! Select EducationTextbook Nature');
  //     this.assetNature.nativeElement.focus();
  //     return false;
  //   }
  //   if (!this.entity.quantity) {
  //     this._toastr.error('Please! Enter Quantity');
  //     this.quantity.nativeElement.focus();
  //     return false;
  //   }
  //   if (!this.entity.status) {
  //     this._toastr.error('Please! Select Status');
  //     this.status.nativeElement.focus();
  //     return false;
  //   }


  //   return true;
  // }




  public educationTextbookCreateRequest: EducationTextbookCreateRequest = new EducationTextbookCreateRequest();
  public entity: EducationTextbookCreateRequestBody = new EducationTextbookCreateRequestBody();

  saveEducationTextbook() {
    // if (!this.isValidData()) {
    //   return;
    // }

    this.educationTextbookCreateRequest.header = this.header;
    this.educationTextbookCreateRequest.body = this.entity;
    this.entity.saveTextbookList = [];
    this.entity.updateTextbookList = [];
    this.entity.deleteTextbookList = [];
    this.entity.deleteTextbookList = this.deleteEducationTextbookList;

    this.educationTextbookVersionList.forEach((element) => {
      element.educationTextbookList.forEach((obj) => {
        if (this._constantService.isNullOrEmpty(obj.oid)) {
          if (obj.isDeleteData) {
            // this.entity.deleteTextbookList.push(obj);
          } else {
            this.entity.saveTextbookList.push(obj);
          }

        } else {
          if (obj.isNewlyAddedData && obj.isDeleteData) {
            this.entity.deleteTextbookList.push(obj);
          } else if (obj.isNewlyAddedData && !obj.isDeleteData) {
            this.entity.saveTextbookList.push(obj);
          } else if (!obj.isNewlyAddedData && !obj.isDeleteData) {
            this.entity.updateTextbookList.push(obj);
          } else if (!obj.isNewlyAddedData && obj.isDeleteData) {
            // this.entity.deleteTextbookList.push(obj);
          }


        }
      })
    })

    this.educationTextbookCreateRequest.body.educationSessionOid = this.selectedEducationSessionOid;
    this.educationTextbookCreateRequest.body.educationClassOid = this.selectedEducationClassOid;
    this.educationTextbookCreateRequest.body.status = 'Active';
    this.educationTextbookCreateRequest.body.createdBy = this.userInfo.loginId;
    this.educationTextbookCreateRequest.body.updatedBy = this.userInfo.loginId;


    this._spinner.show();
    this._textbookService.educationTextbookCreate(this.educationTextbookCreateRequest).subscribe(data => {
      this._spinner.hide();

      if (data.header.responseCode == '200') {
        this._toastr.success('Information Saved Successfully');
        this._router.navigate(['/admin/education/textbook/list']);
      }
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      });
  }



  goBack() {
    this._location.back();
  }

}
