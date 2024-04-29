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
import { InstituteAddRequest } from 'src/app/school-erp/common/shared/request/institute/institute-add-request';
import { InstituteAddRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-add-request-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { InstituteAddResponse } from 'src/app/school-erp/common/shared/response/institute/institute-add-response';
import { InstituteAddResponseBody } from 'src/app/school-erp/common/shared/response/institute/institute-add-response-body';
import { EducationVersionEntity } from 'src/app/school-erp/common/shared/model/education/education-version-entity';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { DUPLICATE_EIIN_NUMBER_RESPONSE_CODE, DUPLICATE_LOGIN_ID_RESPONSE_CODE, USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { EducationSessionEntity } from 'src/app/school-erp/common/shared/model/education/education-session-entity';
import { GetEducationInfoResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-info-response-body';
import { NgForm } from '@angular/forms';
import { BANGLA_REGEX, EMAIL_REGEX, ENGLISH_REGEX, MOBILE_NO_REGEX, NAME_REGEX, NUMBER_REGEX, POST_CODE_REGEX } from 'src/app/common/constant/reg-constant';
import * as _ from 'underscore';
import { EducationSubjectAddRequest } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-add-request';
import { EducationSubjectAddRequestBody } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-add-request-body';
import { EducationSubjectAddResponse } from 'src/app/school-erp/common/shared/response/education-subject/education-subject-add-response';
import { EducationTypeList } from 'src/app/school-erp/common/shared/model/education-subject/education-type-list';
import { EducationGroupEntity } from 'src/app/school-erp/common/shared/model/education/education-group-entity';
import { EducationSubjectService } from 'src/app/school-erp/common/shared/services/education/education-subject.service';

@Component({
  selector: 'app-admin-education-subject-add',
  templateUrl: './admin-education-subject-add.component.html',
  styleUrls: ['./admin-education-subject-add.component.scss']
})
export class AdminEducationSubjectAddComponent implements OnInit {


  @ViewChild('createEducationSubject') createEducationSubject: NgForm;
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

  @ViewChild('educationTypeOid') educationTypeOid: any;
  @ViewChild('educationGroupOid') educationGroupOid: any;



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
    private router: Router
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

    this.setUpUI();
  }

  setUpUI() {
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

  createSubject() {
    if (!this.isValidData()) {
      return;
    }

    this.filterEducationType();

    this.educationSubjectAddRequest.header = this.header;
    this.educationSubjectAddRequestBody.educationTypeList = this.filterEducationTypeList;
    this.educationSubjectAddRequest.body = this.educationSubjectAddRequestBody;

    this.educationSubjectService.getEducationSubjectAdd(this.educationSubjectAddRequest).subscribe(data => {
      if (data.header.responseCode == "200") {
        this.toastr.success('Add Subject Successfully');
        this.router.navigate(['/admin/education/subject/list']);
      }
    });
  }

  filterEducationTypeList: EducationTypeList[] = [];
  educationType: EducationTypeList;

  filterEducationType() {
    this.filterEducationTypeList = [];
    this.educationTypeList.map(res => {
      if (res.check) {
        this.educationType = new EducationTypeList();
        this.educationType.educationTypeOid = res.oid;
        this.educationType.educationGroupOid = this.educationGroupOid;
        this.filterEducationTypeList.push(this.educationType);
      }
    })
  }

  isValidMark() {

    let mark = 0;

    if (this.educationSubjectAddRequestBody.writtenMarks) {
      mark += Number(this.educationSubjectAddRequestBody.writtenMarks);
    }

    if (this.educationSubjectAddRequestBody.mcqMarks) {
      mark += Number(this.educationSubjectAddRequestBody.mcqMarks);
    }

    if (this.educationSubjectAddRequestBody.practicalMarks) {
      mark += Number(this.educationSubjectAddRequestBody.practicalMarks);
    }

    if (this.educationSubjectAddRequestBody.vivaMarks) {
      mark += Number(this.educationSubjectAddRequestBody.vivaMarks);
    }

    if (this.educationSubjectAddRequestBody.totalMarks < mark) {
      this.toastr.error("Invalid subject mark");
    }
  }

  isValidData() {
    if (!this.educationSubjectAddRequestBody.nameEn.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Subject Name in English');
      this.nameEn.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody.nameBn.match(this.nameBnPattern)) {
      this.toastr.error('Please! Check Subject Name in Bangla');
      this.nameBn.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody.subjectCode.match(this.numberPattern)) {
      this.toastr.error('Please! Check Subject Code');
      this.subjectCode.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody) {
      this.toastr.error('Please! Select Subject Type');
      this.subjectType.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody.educationSessionOid) {
      this.toastr.error('Please! Select Education Session');
      this.educationSessionOid.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody.totalMarks.toString().match(this.numberPattern)) {
      this.toastr.error('Please! Check Total Mark');
      this.totalMarks.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody.mcqMarks.toString().match(this.numberPattern)) {
      this.toastr.error('Please! Check MCQ Marks');
      this.mcqMarks.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody.writtenMarks.toString().match(this.numberPattern)) {
      this.toastr.error('Please! Check Written Marks');
      this.writtenMarks.nativeElement.focus();
      return false;
    }

    if (this.educationSubjectAddRequestBody.practicalMarks)
      if (!this.educationSubjectAddRequestBody.practicalMarks.toString().match(this.numberPattern)) {
        this.toastr.error('Please! Check Practical Marks');
        this.practicalMarks.nativeElement.focus();
        return false;
      }

    if (this.educationSubjectAddRequestBody.vivaMarks)
      if (!this.educationSubjectAddRequestBody.vivaMarks.toString().match(this.numberPattern)) {
        this.toastr.error('Please! Check Viva Marks');
        this.vivaMarks.nativeElement.focus();
        return false;
      }

    if (!this.educationSubjectAddRequestBody.educationMediumOid) {
      this.toastr.error('Please! Check Education Medium');
      this.educationSystemOid.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody.educationSystemOid) {
      this.toastr.error('Please! Check Education System');
      this.educationSystemOid.nativeElement.focus();
      return false;
    }

    if (!this.educationSubjectAddRequestBody.educationCurriculumOid) {
      this.toastr.error('Please! Check Education Curriculum');
      this.educationCurriculumOid.nativeElement.focus();
      return false;
    }

    if (!this.filterEducationTypeList) {
      this.toastr.error('Please! Check Education Type');
      this.educationCurriculumOid.nativeElement.focus();
      return false;
    }

    return true;
  }


}



