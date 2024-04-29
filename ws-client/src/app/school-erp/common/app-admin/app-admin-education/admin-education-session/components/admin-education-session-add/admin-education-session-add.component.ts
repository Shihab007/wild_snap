import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { Location } from '@angular/common';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';
import { EducationBoardEntity } from 'src/app/school-erp/common/shared/model/education/education-board-entity';
import { EducationMediumEntity } from 'src/app/school-erp/common/shared/model/education/education-medium-entity';
import { EducationCurriculumEntity } from 'src/app/school-erp/common/shared/model/education/education-curriculum-entity';
import { EducationSystemEntity } from 'src/app/school-erp/common/shared/model/education/education-system-entity';
import { GetEducationInfoRequest } from 'src/app/school-erp/common/shared/request/education/get-education-info-request';
import { GetEducationInfoRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-info-request-body';
import { EducationTypeEntity } from 'src/app/school-erp/common/shared/model/education/education-type-entity';
import { EducationGradingSystemEntity } from 'src/app/school-erp/common/shared/model/education/education-grading-system-entity';
import { EducationShiftEntity } from 'src/app/school-erp/common/shared/model/education/education-shift-entity';
import { EducationVersionEntity } from 'src/app/school-erp/common/shared/model/education/education-version-entity';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { EducationSessionEntity } from 'src/app/school-erp/common/shared/model/education/education-session-entity';
import { GetEducationInfoResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-info-response-body';
import { SaveEducationSessionRequestBody } from 'src/app/school-erp/common/shared/request/education/save-education-session-request-body';
import { SaveEducationSessionRequest } from 'src/app/school-erp/common/shared/request/education/save-education-session-request';
import { EducationSessionService } from 'src/app/school-erp/common/shared/services/education/education-session.service';
import { EducationTypeSession } from 'src/app/school-erp/common/shared/model/education/education-type-session';
import { GetEducationSessionListRequest } from 'src/app/school-erp/common/shared/request/education/get-education-session-list-request';
import { GetEducationSessionListRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-session-list-request-body';
import { EducationSession } from 'src/app/school-erp/common/shared/model/education/education-session';
import { GetEducationSessionRequest } from 'src/app/school-erp/common/shared/request/education/get-education-session-request';
import { GetEducationSessionRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-session-request-body';



@Component({
  selector: 'app-admin-education-session-add',
  templateUrl: './admin-education-session-add.component.html',
  styleUrls: ['./admin-education-session-add.component.scss']
})
export class AdminEducationSessionAddComponent implements OnInit {

  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public isNextEduactionSessionExist: boolean = false;

  public entity: SaveEducationSessionRequestBody = new SaveEducationSessionRequestBody();
  public educationShiftList: EducationShiftEntity[];
  public educationBoardList: EducationBoardEntity[];
  public educationMediumList: EducationMediumEntity[];
  public educationVersionList: EducationVersionEntity[];
  public educationCurriculumList: EducationCurriculumEntity[];
  public educationSystemList: EducationSystemEntity[];
  public educationTypeList: EducationTypeEntity[] = [];
  public sessionEducationTypeList: EducationTypeEntity[] = [];
  public sessionList: EducationSessionEntity[];
  public educationInfo: GetEducationInfoResponseBody = new GetEducationInfoResponseBody();
  public educationSessionList: EducationSessionEntity[];
  public educationGradingSystemList: EducationGradingSystemEntity[];
  // public districtList: DistrictList[];

  public runningEducationSessionList: EducationSession[];

  constructor(
    private educationService: EducationService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private appStorageService: AppStorageService,
    private router: Router,
    private _educationSessionService: EducationSessionService,
    private _location: Location,
  ) { }

  public requestHeader: RequestHeader = new RequestHeader();
  public getEducationInfoRequest: GetEducationInfoRequest = new GetEducationInfoRequest();
  public getEducationInfoRequestBody: GetEducationInfoRequestBody = new GetEducationInfoRequestBody();

  ngOnInit(): void {
    this.local = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });
    this.userInfo = JSON.parse(this.appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));

    this.getEducationInformation();
  }


  getEducationInformation() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getEducationInfoRequest.header = this.requestHeader;
    this.getEducationInfoRequest.body = this.getEducationInfoRequestBody;

    this.educationService.getEducationInfo(this.getEducationInfoRequest)
      .subscribe(response => {
        if (response.header.responseCode === "200") {
          this.educationInfo = response.body;
          this.educationShiftList = response.body.educationShiftList;
          this.educationBoardList = response.body.educationBoardList;
          this.educationMediumList = response.body.educationMediumList;
          this.educationVersionList = response.body.educationVersionList;
          this.educationGradingSystemList = response.body.educationGradingSystemList;
        }
      },
        (error) => {
          console.log(error);
          this.toastr.error(error.Message);
        }
      );
  }

  changeMedium(event: any) {
    this.educationCurriculumList = [];
    this.educationCurriculumList = this.educationInfo.educationCurriculumList.filter(el => el.educationMediumOid == event);
  }

  changeCurriculum(event: any) {
    this.educationTypeList = [];
    this.educationSystemList = this.educationInfo.educationSystemList.filter(el => el.educationCurriculumOid == event);
  }

  changeEducationSystem(event: any) {
    this.educationTypeList = [];
    this.educationGradingSystemList = [];
    this.educationTypeList = this.educationInfo.educationTypeList.filter(el => el.educationSystemOid == event);
    this.educationGradingSystemList = this.educationInfo.educationGradingSystemList.filter(el => el.educationSystemOid == event);
    if (this.educationTypeList.length > 0) {
      this.getRunningEducationSessionList();
    }

  }

  changePreviousSession(event: any) {
    this.getEducationSesionByOid(event);
  }


  getRunningEducationSessionListRequest: GetEducationSessionListRequest = new GetEducationSessionListRequest();
  getRunningEducationSessionListRequestBody: GetEducationSessionListRequestBody = new GetEducationSessionListRequestBody();
  getRunningEducationSessionList() {


    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getRunningEducationSessionListRequestBody.educationSystemOid = this.entity.educationSystemOid;
    this.getRunningEducationSessionListRequestBody.status = "Running";

    this.getRunningEducationSessionListRequest.header = this.requestHeader;
    this.getRunningEducationSessionListRequest.body = this.getRunningEducationSessionListRequestBody;

    this._educationSessionService.educationSessionList(this.getRunningEducationSessionListRequest).subscribe(data => {
      this.runningEducationSessionList = data.body.educationSessionList;
    })
  }



  public getEducationSessionRequest: GetEducationSessionRequest = new GetEducationSessionRequest();
  public getEducationSessionRequestBody: GetEducationSessionRequestBody = new GetEducationSessionRequestBody();
  getEducationSesionByOid(eduSessionOid: any) {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.getEducationSessionRequest.header = this.requestHeader;
    this.getEducationSessionRequest.body = this.getEducationSessionRequestBody;
    this.getEducationSessionRequest.body.oid = eduSessionOid;
    this._educationSessionService.getEducationSessionByOid(this.getEducationSessionRequest).subscribe(data => {

      if (data.body != null) {
        this.entity.nameEn = null;
        this.entity.nameBn = null;
        this.educationTypeList.map(type => {
          type.check = false;
        })
        this.educationTypeList.map(res => {
          data.body.educationSession.educationTypeList.map(type => {
            if (res.oid == type.oid) {
              res.check = true;
            }
          })
        })
        if (data.body.educationSession.nextSession != null && data.body.educationSession.nextSession != "") {
          this.isNextEduactionSessionExist = true;
          this.toastr.error("Next Session of this Session Already Exists!! ID:" + data.body.educationSession.nextSession);
        } else {
          this.isNextEduactionSessionExist = false;
        }
      }
    },
      (error) => {
        console.log(error);
      });

  }



  public saveEducationSessionRequest: SaveEducationSessionRequest = new SaveEducationSessionRequest();
  public saveEducationSessionRequestBody: SaveEducationSessionRequestBody = new SaveEducationSessionRequestBody();

  addEducationSession() {
    if (this.entity.nameEn == null || this.entity.nameBn == null ||
      this.entity.previousSessionOid == null || this.entity.educationSystemOid == null || this.entity.educationCurriculumOid == null) {
      this.toastr.error("Please Add a new Session name to proceed!");
      return 0;
    }

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.entity.educationTypeSessionList = [];
    this.educationTypeList.map(type => {
      if (type.check == true) {
        var sessionType: EducationTypeSession = new EducationTypeSession();
        sessionType.oid = type.oid;
        sessionType.nameEn = type.nameEn;
        sessionType.nameBn = type.nameBn;
        sessionType.educationTypeOid = type.oid;
        sessionType.educationSystemOid = type.educationSystemOid;
        sessionType.status = type.status;
        this.entity.educationTypeSessionList.push(sessionType);
      }
    });
    console.log('-------EduType-----------');
    console.log(this.entity.educationTypeSessionList);


    this.saveEducationSessionRequest.header = this.requestHeader;
    this.saveEducationSessionRequest.body = this.entity;

    this._educationSessionService.saveEducationSession(this.saveEducationSessionRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.toastr.success("Session is saved successfully");
        this.router.navigate(['admin/education/session/list']);
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message);
      })
  }


  goBack() {
    this._location.back();
  }

}



