import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { DistrictList } from 'src/app/school-erp/common/shared/model/district/district-list';
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
import { GetEducationSessionRequest } from 'src/app/school-erp/common/shared/request/education/get-education-session-request';
import { GetEducationSessionRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-session-request-body';
import { GetEducationSessionResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-session-response-body';
import { EditEducationSessionRequestBody } from 'src/app/school-erp/common/shared/request/education/edit-education-session-request-body';
import { EditEducationSessionRequest } from 'src/app/school-erp/common/shared/request/education/edit-education-session-request';

@Component({
  selector: 'app-admin-education-session-edit',
  templateUrl: './admin-education-session-edit.component.html',
  styleUrls: ['./admin-education-session-edit.component.scss']
})
export class AdminEducationSessionEditComponent implements OnInit {

  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();

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
  public districtList: DistrictList[];

  constructor(
    private educationService: EducationService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private appStorageService: AppStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private _eduactionSessionService: EducationSessionService,
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

          //system and curriculum
          this.educationCurriculumList = this.educationInfo.educationCurriculumList;
          this.educationSystemList = this.educationInfo.educationSystemList;
          this.getEducationSesionByOid();
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
    this.educationCurriculumList = this.educationInfo.educationCurriculumList.filter(el => el.educationMediumOid == event.target.value);
  }

  changeCurriculum(event: any) {
    this.educationTypeList = [];
    this.educationSystemList = this.educationInfo.educationSystemList.filter(el => el.educationCurriculumOid == event.target.value);
  }

  changeEducationSystem(event: any) {
    this.educationTypeList = this.educationInfo.educationTypeList.filter(el => el.educationSystemOid == event.target.value);
    this.educationGradingSystemList = this.educationGradingSystemList.filter(el => el.educationSystemOid == event.target.value);
  }

  public getEducationSessionRequest: GetEducationSessionRequest = new GetEducationSessionRequest();
  public getEducationSessionRequestBody: GetEducationSessionRequestBody = new GetEducationSessionRequestBody();

  getEducationSesionByOid() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.getEducationSessionRequest.header = this.requestHeader;
    this.getEducationSessionRequest.body = this.getEducationSessionRequestBody;
    this.getEducationSessionRequest.body.oid = this.route.snapshot.params["oid"];

    this._eduactionSessionService.getEducationSessionByOid(this.getEducationSessionRequest).subscribe(data => {
      if (data.body != null) {
        this.educationInfo.educationTypeList.map(res => {
          data.body.educationSession.educationTypeList.map(type => {
            if (res.oid == type.oid) {
              res.check = true;
              this.educationTypeList.push(res);
            }
          })
        })

        this.entity.oid = data.body.educationSession.oid;
        this.entity.nameEn = data.body.educationSession.nameEn;
        this.entity.nameBn = data.body.educationSession.nameBn;
        this.entity.educationCurriculumOid = data.body.educationSession.educationCurriculumOid;
        this.entity.educationSystemOid = data.body.educationSession.educationSystemOid;
        this.entity.status = data.body.educationSession.status;
      }
    },
      (error) => {
        console.log(error);
      });
  }

  isValid() {
    if (this.entity.nameEn === null || this.entity.nameEn === undefined || this.entity.nameEn === "") {
      this.toastr.error("please insert name en");
      return false;
    }


    if (this.entity.nameBn === null || this.entity.nameBn === undefined || this.entity.nameBn === "") {
      this.toastr.error("please insert name bn");
      return false;
    }

    if (this.entity.status === null || this.entity.status === undefined || this.entity.status === "") {
      this.toastr.error("please select status");
      return false;
    }
    return true;
  }


  public editEducationSessionRequest: EditEducationSessionRequest = new EditEducationSessionRequest();
  public editEducationSessionRequestBody: EditEducationSessionRequestBody = new EditEducationSessionRequestBody();

  editEducationSession() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.editEducationSessionRequest.header = this.requestHeader;
    this.editEducationSessionRequest.body = this.entity;

    console.log('-------requ--------');
    console.log(this.editEducationSessionRequest.body);

    if (!this.isValid()) {
      return;
    }
    this._eduactionSessionService.editEducationSession(this.editEducationSessionRequest).subscribe(response => {
      if (response.header.responseCode === "200") {

        this.toastr.success("Session is edited successfully");
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



