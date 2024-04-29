import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Header } from 'src/app/common/request/base-request';
import { Location } from '@angular/common';
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
import { EducationSessionService } from 'src/app/school-erp/common/shared/services/education/education-session.service';
import { GetEducationSessionListRequest } from 'src/app/school-erp/common/shared/request/education/get-education-session-list-request';
import { GetEducationSessionListRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-session-list-request-body';
import { EducationSession } from 'src/app/school-erp/common/shared/model/education/education-session';
import { GetEducationSessionInstituteListRequest } from 'src/app/school-erp/common/shared/request/education/get-education-session-institute-list-request';
import { GetEducationSessionInstituteListRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-session-institute-list-request-body';
import { EducationSessionInstitute } from 'src/app/school-erp/common/shared/model/education/education-session-institute';
import { ConfigureEducationSessionRequestBody } from 'src/app/school-erp/common/shared/request/education/configure-education-session-request-body';
import { ConfigureEducationSessionRequest } from 'src/app/school-erp/common/shared/request/education/configure-education-session-request';


@Component({
  selector: 'app-admin-education-session-configure',
  templateUrl: './admin-education-session-configure.component.html',
  styleUrls: ['./admin-education-session-configure.component.scss']
})
export class AdminEducationSessionConfigureComponent implements OnInit {

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
  public totalInstitute: number;
  public enrolledInstitute: number;
  public addSessionFor: String;
  public isSingle: boolean = true;
  // public educationSessionList: EducationSessionEntity[];
  public educationSessionList: EducationSession[];
  public educationSessionInstituteList: EducationSessionInstitute[] = [];
  public educationGradingSystemList: EducationGradingSystemEntity[];
  public districtList: DistrictList[];

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
          // this.educationGradingSystemList = response.body.educationGradingSystemList;
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

    this.educationTypeList = this.educationInfo.educationTypeList.filter(el => el.educationSystemOid == event);
    this.getEducationSessionList();
  }





  getEducationSessionListRequest: GetEducationSessionListRequest = new GetEducationSessionListRequest();
  getEducationSessionListRequestBody: GetEducationSessionListRequestBody = new GetEducationSessionListRequestBody();
  getEducationSessionList() {
    this.getEducationSessionListRequestBody.educationSystemOid = this.entity.educationSystemOid;
    this.getEducationSessionListRequestBody.status = "upcoming";
    this.getEducationSessionListRequest.body = this.getEducationSessionListRequestBody;
    this._educationSessionService.educationSessionList(this.getEducationSessionListRequest).subscribe(data => {
      this.educationSessionList = data.body.educationSessionList;
    })
  }

  getEducationSessionInstituteListRequest: GetEducationSessionInstituteListRequest = new GetEducationSessionInstituteListRequest();
  getEducationSessionInstituteListRequestBody: GetEducationSessionInstituteListRequestBody = new GetEducationSessionInstituteListRequestBody();
  getEducationSessionInstituteList(educationSessionOid: String) {
    this.getEducationSessionInstituteListRequestBody.educationSessionOid = educationSessionOid;
    this.getEducationSessionInstituteListRequest.body = this.getEducationSessionInstituteListRequestBody;
    this._educationSessionService.educationSessionInstituteList(this.getEducationSessionInstituteListRequest).subscribe(data => {
      this.educationSessionInstituteList = [];
      data.body.educationSessionInstituteList.map(res => {
        if (!res.enrolled) {
          this.educationSessionInstituteList.push(res);
        }
      })
    })
  }


  changeEducationSession(event: any) {
    console.log(event);
    this.totalInstitute = event.noOfInstitute;
    this.enrolledInstitute = event.noOfSessionEnrolledInstitute;
    this.getEducationSessionInstituteList(event.oid);
    this.configureEducationSessionRequestBody.educationSessionOid = event.oid;
  }

  viewInstituteList() {

  }


  configureEducationSessionRequest: ConfigureEducationSessionRequest = new ConfigureEducationSessionRequest();
  configureEducationSessionRequestBody: ConfigureEducationSessionRequestBody = new ConfigureEducationSessionRequestBody();
  configureEducationSession() {
    this.configureEducationSessionRequestBody.applicableInstituteType = this.addSessionFor;
    this.configureEducationSessionRequestBody.createdBy = this.userInfo.loginId;
    if (this.configureEducationSessionRequestBody.applicableInstituteType === "All") {
      this.configureEducationSessionRequestBody.instituteList = this.educationSessionInstituteList;
    }
    this.configureEducationSessionRequest.body = this.configureEducationSessionRequestBody;
    this._educationSessionService.configureEducationSession(this.configureEducationSessionRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.toastr.success("Institute Session is saved successfully");
        this.router.navigate(['admin/education/session/list']);
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message);
      })

  }



  // public saveEducationSessionRequest: SaveEducationSessionRequest = new SaveEducationSessionRequest();
  // public saveEducationSessionRequestBody: SaveEducationSessionRequestBody = new SaveEducationSessionRequestBody();

  // addEducationSession() {


  //   this.requestHeader.requestId = this.header.requestId;
  //   this.requestHeader.requestDateTime = this.header.requestDateTime;
  //   this.requestHeader.requestSource = this.header.requestSource;
  //   this.requestHeader.requestServiceSource = this.header.requestServiceSource;

  //   this.educationTypeList.map(type => {
  //     if (type.check == true) {
  //       var sessionType: EducationTypeSession = new EducationTypeSession();
  //       sessionType.nameEn = type.nameEn;
  //       sessionType.nameBn = type.nameBn;
  //       sessionType.educationTypeOid = type.oid;
  //       sessionType.educationSystemOid = type.educationSystemOid;
  //       sessionType.status = type.status;

  //       this.entity.educationTypeSessionList.push(sessionType);
  //     }
  //   });

  //   this.saveEducationSessionRequest.header = this.requestHeader;
  //   this.saveEducationSessionRequest.body = this.entity;
  //   console.log("-----------------------request status--------------------------------")
  //   console.log(this.educationTypeList);
  //   console.log(this.saveEducationSessionRequest);


  //   this._eduactionSessionService.saveEducationSession(this.saveEducationSessionRequest).subscribe(response => {
  //     if (response.header.responseCode === "200") {
  //       this.toastr.success("Session is saved successfully");
  //       this.router.navigate(['admin/education/session/list']);
  //     }
  //   },
  //     (error) => {
  //       console.log(error);
  //       this.toastr.error(error.Message);
  //     })
  // }


  goBack() {
    this._location.back();
  }

}



