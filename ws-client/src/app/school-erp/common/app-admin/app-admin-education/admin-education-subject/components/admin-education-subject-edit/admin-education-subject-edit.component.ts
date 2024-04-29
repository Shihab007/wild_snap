import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
import { InstituteAddRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-add-request-body';
import { EducationVersionEntity } from 'src/app/school-erp/common/shared/model/education/education-version-entity';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { EducationSessionEntity } from 'src/app/school-erp/common/shared/model/education/education-session-entity';
import { GetEducationInfoResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-info-response-body';
import { NgForm } from '@angular/forms';
import { BANGLA_REGEX, ENGLISH_REGEX, NUMBER_REGEX } from 'src/app/common/constant/reg-constant';
import * as _ from 'underscore';
import { EducationSubjectAddRequest } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-add-request';
import { EducationSubjectAddRequestBody } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-add-request-body';
import { EducationSubjectAddResponse } from 'src/app/school-erp/common/shared/response/education-subject/education-subject-add-response';
import { EducationGroupEntity } from 'src/app/school-erp/common/shared/model/education/education-group-entity';
import { EducationSubjectService } from 'src/app/school-erp/common/shared/services/education/education-subject.service';
import { EducationSubjectViewRequestBody } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-view-request-body';
import { EducationSubjectViewRequest } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-view-request';
import { EducationSubjectEditRequest } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-edit-request';
import { EducationSubjectEditRequestBody } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-edit-request-body';
import { EducationSubjectEditResponseBody } from 'src/app/school-erp/common/shared/response/education-subject/education-subject-edit-response-body';
import { SharedDataService } from 'src/app/school-erp/common/shared/model/education-subject/educaiton-subject-data-store';
import { EducationSubjectViewResponseBody } from 'src/app/school-erp/common/shared/response/education-subject/education-subject-view-response-body';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-education-subject-edit',
  templateUrl: './admin-education-subject-edit.component.html',
  styleUrls: ['./admin-education-subject-edit.component.scss']
})
export class AdminEducationSubjectEditComponent implements OnInit {

  @ViewChild('updateEducationSubject') createEducationSubject: NgForm;
  @ViewChild('nameEn') nameEn: any;
  @ViewChild('nameBn') nameBn: any;
  @ViewChild('subjectCode') subjectCode: any;
  @ViewChild('subjectType') subjectType: any;
  @ViewChild('educationSystemOid') educationSystemOid: any;
  @ViewChild('educationCurriculumOid') educationCurriculumOid: any;
  @ViewChild('educationSessionOid') educationSessionOid: any;
  @ViewChild('totalMarks') totalMarks: any;
  @ViewChild('mcqMarks') mcqMarks: any;
  @ViewChild('writtenMarks') writtenMarks: any;
  @ViewChild('practicalMarks') practicalMarks: any;
  @ViewChild('vivaMarks') vivaMarks: any;



  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();

  public entity: InstituteAddRequestBody = new InstituteAddRequestBody();
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
  educationGroupList: EducationGroupEntity[];

  constructor(
    private educationSubjectService: EducationSubjectService,
    private educationService: EducationService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private appStorageService: AppStorageService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private _location: Location
  ) { }

  public nameEnPattern = ENGLISH_REGEX;
  public nameBnPattern = BANGLA_REGEX;
  public numberPattern = NUMBER_REGEX;

  public requestHeader: RequestHeader = new RequestHeader();
  public getEducationInfoRequest: GetEducationInfoRequest = new GetEducationInfoRequest();
  public getEducationInfoRequestBody: GetEducationInfoRequestBody = new GetEducationInfoRequestBody();
  public educationSubjectAddRequest: EducationSubjectAddRequest = new EducationSubjectAddRequest();
  public educationSubjectAddResponse: EducationSubjectAddResponse = new EducationSubjectAddResponse();
  public educationSubjectAddRequestBody: EducationSubjectAddRequestBody = new EducationSubjectAddRequestBody();

  educationSubjectOids: any;

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
    this.sharedDataService.data$.subscribe((data) => {
      this.educationSubjectOids = data[0];
    });

    this.setUpUI();
  }

  setUpUI() {
    this.getEducationInformation();
    this.getEducationSubject();
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
          this.educationSessionList = response.body.educationSessionList;
          this.educationGroupList = response.body.educationGroupList;
        }
      },
        (error) => {
          console.log(error);
          this.toastr.error(error.Message);
        }
      );
  }

  public educationSubjectViewRequest: EducationSubjectViewRequest = new EducationSubjectViewRequest();
  public educationSubjectViewRequestBody: EducationSubjectViewRequestBody = new EducationSubjectViewRequestBody();
  public educationSubjectViewResponseBody: EducationSubjectViewResponseBody = new EducationSubjectViewResponseBody();


  public educationSubjectEditRequest: EducationSubjectEditRequest = new EducationSubjectEditRequest();
  public educationSubjectEditRequestBody: EducationSubjectEditRequestBody = new EducationSubjectEditRequestBody();
  public educationSubjectEditResponseBody: EducationSubjectEditResponseBody = new EducationSubjectEditResponseBody();

  getEducationSubject() {
    this.educationSubjectViewRequestBody.oid = this.educationSubjectOids.oid;
    this.educationSubjectViewRequestBody.educationCurriculumOid = this.educationSubjectOids.educationCurriculumOid;
    this.educationSubjectViewRequestBody.educationSessionOid = this.educationSubjectOids.educationSessionOid;

    this.educationSubjectViewRequest.header = this.header;
    this.educationSubjectViewRequest.body = this.educationSubjectViewRequestBody;

    this.educationSubjectService.getEducationSubjectByOid(this.educationSubjectViewRequest).subscribe(data => {
      if (data.header.responseCode == "200") {
        this.educationSubjectViewResponseBody = data.body;

        this.educationSubjectEditRequestBody.oid = this.educationSubjectViewResponseBody.oid;
        this.educationSubjectEditRequestBody.nameEn = this.educationSubjectViewResponseBody.nameEn;
        this.educationSubjectEditRequestBody.nameBn = this.educationSubjectViewResponseBody.nameBn;
        this.educationSubjectEditRequestBody.subjectCode = this.educationSubjectViewResponseBody.subjectCode;
        this.educationSubjectEditRequestBody.subjectType = this.educationSubjectViewResponseBody.subjectType;
        this.educationSubjectEditRequestBody.status = this.educationSubjectViewResponseBody.status;
        this.educationSubjectEditRequestBody.educationSystemOid = this.educationSubjectViewResponseBody.educationSystemOid;
        this.educationSubjectEditRequestBody.educationSystemNameEn = this.educationSubjectViewResponseBody.educationSystemNameEn;
        this.educationSubjectEditRequestBody.educationSystemNameBn = this.educationSubjectViewResponseBody.educationSystemNameBn;
        this.educationSubjectEditRequestBody.educationCurriculumOid = this.educationSubjectViewResponseBody.educationCurriculumOid;
        this.educationSubjectEditRequestBody.educationCurriculumNameEn = this.educationSubjectViewResponseBody.educationCurriculumNameEn;
        this.educationSubjectEditRequestBody.educationCurriculumNameBn = this.educationSubjectViewResponseBody.educationCurriculumNameBn;
        this.educationSubjectEditRequestBody.totalMarks = this.educationSubjectViewResponseBody.subjectMark.totalMarks;
        this.educationSubjectEditRequestBody.mcqMarks = this.educationSubjectViewResponseBody.subjectMark.mcqMarks;
        this.educationSubjectEditRequestBody.writtenMarks = this.educationSubjectViewResponseBody.subjectMark.writtenMarks;
        this.educationSubjectEditRequestBody.practicalMarks = this.educationSubjectViewResponseBody.subjectMark.practicalMarks;
        this.educationSubjectEditRequestBody.vivaMarks = this.educationSubjectViewResponseBody.subjectMark.vivaMarks;

      }
    });
  }



  updateSubject() {
    if (!this.isValidData()) {
      return;
    }

    this.educationSubjectEditRequest.header = this.header;
    this.educationSubjectEditRequest.body = this.educationSubjectEditRequestBody;

    this.educationSubjectService.getEducationSubjectEdit(this.educationSubjectEditRequest).subscribe(data => {
      if (data.header.responseCode == "200") {
        this.toastr.success('Update Subject Successfully');
        this.router.navigate(['/admin/education/subject/list']);
      }
    });
  }


  isValidMark() {

    let mark = 0;

    if (this.educationSubjectEditRequestBody.writtenMarks) {
      mark += Number(this.educationSubjectEditRequestBody.writtenMarks);
    }

    if (this.educationSubjectEditRequestBody.mcqMarks) {
      mark += Number(this.educationSubjectEditRequestBody.mcqMarks);
    }

    if (this.educationSubjectEditRequestBody.practicalMarks) {
      mark += Number(this.educationSubjectEditRequestBody.practicalMarks);
    }

    if (this.educationSubjectEditRequestBody.vivaMarks) {
      mark += Number(this.educationSubjectEditRequestBody.vivaMarks);
    }

    if (this.educationSubjectEditRequestBody.totalMarks < mark) {
      this.toastr.error("Invalid subject mark");
    }
  }

  isValidData() {
    if (!this.educationSubjectEditRequestBody.nameEn.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Subject Name in English');
      this.nameEn.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectEditRequestBody.nameBn.match(this.nameBnPattern)) {
      this.toastr.error('Please! Check Subject Name in Bangla');
      this.nameBn.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectEditRequestBody.subjectCode.match(this.numberPattern)) {
      this.toastr.error('Please! Check Subject Code');
      this.subjectCode.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectEditRequestBody) {
      this.toastr.error('Please! Select Subject Type');
      this.subjectType.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectEditRequestBody.totalMarks.toString().match(this.numberPattern)) {
      this.toastr.error('Please! Check Total Mark');
      this.totalMarks.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectEditRequestBody.mcqMarks.toString().match(this.numberPattern)) {
      this.toastr.error('Please! Check MCQ Marks');
      this.mcqMarks.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectEditRequestBody.writtenMarks.toString().match(this.numberPattern)) {
      this.toastr.error('Please! Check Written Marks');
      this.writtenMarks.nativeElement.focus();
      return false;
    }

    if (this.educationSubjectEditRequestBody.practicalMarks)
      if (!this.educationSubjectEditRequestBody.practicalMarks.toString().match(this.numberPattern)) {
        this.toastr.error('Please! Check Practical Marks');
        this.practicalMarks.nativeElement.focus();
        return false;
      }

    if (this.educationSubjectEditRequestBody.vivaMarks)
      if (!this.educationSubjectEditRequestBody.vivaMarks.toString().match(this.numberPattern)) {
        this.toastr.error('Please! Check Viva Marks');
        this.vivaMarks.nativeElement.focus();
        return false;
      }

    return true;
  }

  goBack() {
    this._location.back();
  }


}



