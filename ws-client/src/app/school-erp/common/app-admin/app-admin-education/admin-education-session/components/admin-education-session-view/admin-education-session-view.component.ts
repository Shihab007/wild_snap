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
import { EducationSessionService } from 'src/app/school-erp/common/shared/services/education/education-session.service';
import { GetEducationSessionRequest } from 'src/app/school-erp/common/shared/request/education/get-education-session-request';
import { GetEducationSessionRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-session-request-body';
import { GetEducationSessionResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-session-response-body';




@Component({
  selector: 'app-admin-education-session-view',
  templateUrl: './admin-education-session-view.component.html',
  styleUrls: ['./admin-education-session-view.component.scss']
})
export class AdminEducationSessionViewComponent implements OnInit {

  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();

  public entity: GetEducationSessionResponseBody = new GetEducationSessionResponseBody();
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
    private _eduactionSessionService: EducationSessionService,
    private route: ActivatedRoute,
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
    this.getEducationSesionByOid();
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
        this.entity = data.body;
        console.log("-------------educationSessionBy oid----------------");

        console.log(this.entity);
        console.log(this.entity.educationSession.educationCurriculumNameEn);
        console.log(this.entity.educationSession.nameEn);
        console.log(this.entity.educationSession.status);

        this.educationInfo.educationTypeList.map(data => {
          this.entity.educationSession.educationTypeList.map(type => {
            if (data.oid == type.oid) {
              data.check = true;
              this.educationTypeList.push(data);
            }
          })
        })
      }
    },
      (error) => {
        console.log(error);
      });

  }

  editEducationSession() {
    this.router.navigate(['admin/education/session/edit/' + this.entity.educationSession.oid]);
  }


  goBack() {
    this._location.back();
  }

}



