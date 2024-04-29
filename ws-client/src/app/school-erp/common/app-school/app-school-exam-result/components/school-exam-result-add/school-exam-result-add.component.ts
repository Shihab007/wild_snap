import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { ConstantService } from 'src/app/common/services/constant.service';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { StudentListByExamTextbook } from 'src/app/school-erp/common/shared/model/exam-result/student-list-by-examtextbook';
import { ExamClass } from 'src/app/school-erp/common/shared/model/exam/exam-class';
import { ExamList } from 'src/app/school-erp/common/shared/model/exam/exam-list';
import { SchoolExamClassTextBook } from 'src/app/school-erp/common/shared/model/exam/exam-textbook-detail';
import { ExamTime } from 'src/app/school-erp/common/shared/model/exam/exam-time';
import { InstituteClassSection } from 'src/app/school-erp/common/shared/model/institute/institute-class-section';
import { InstituteShiftEntity } from 'src/app/school-erp/common/shared/model/institute/institute-shift-entity';
import { InstituteVersionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-version-entity';
import { StudentListByExamTextbookRequest } from 'src/app/school-erp/common/shared/request/exam-result/get-student-list-by-examtextbook-request';
import { StudentListByExamTextbookRequestBody } from 'src/app/school-erp/common/shared/request/exam-result/get-student-list-by-examtextbook-request-body';
import { SaveExamResultRequest } from 'src/app/school-erp/common/shared/request/exam-result/save-exam-result-request';
import { SaveExamResultRequestBody } from 'src/app/school-erp/common/shared/request/exam-result/save-exam-result-request-body';
import { ExamListBySectionRequest } from 'src/app/school-erp/common/shared/request/exam/exam-list-by-section-request';
import { ExamListBySectionRequestBody } from 'src/app/school-erp/common/shared/request/exam/exam-list-by-section-request-body';
import { GetExamByOidRequest } from 'src/app/school-erp/common/shared/request/exam/get-exam-by-oid-request';
import { GetExamByOidRequestBody } from 'src/app/school-erp/common/shared/request/exam/get-exam-by-oid-request-body';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { StudentListByExamTextbookResponseBody } from 'src/app/school-erp/common/shared/response/exam-result/get-student-list-by-examtextbook-response-body';
import { GetExamByOidResponseBody } from 'src/app/school-erp/common/shared/response/exam/get-exam-by-oid-response-body';
import { ExamResultService } from 'src/app/school-erp/common/shared/services/exam-result/exam-result.service';
import { ExamService } from 'src/app/school-erp/common/shared/services/exam/exam.service';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import * as _ from 'underscore';
import { ClassSubjectList } from 'src/app/school-erp/common/shared/model/subject/class-subject-list';
import { ClassSubjectListRequest } from 'src/app/school-erp/common/shared/request/subject/class-subject-list-request';
import { ClassSubjectListRequestBody } from 'src/app/school-erp/common/shared/request/subject/class-subject-list-request-body';
import { ClassSubjectListResponseBody } from 'src/app/school-erp/common/shared/response/subject/class-subject-list-response-body';
import { ExamSubject } from 'src/app/school-erp/common/shared/model/exam/exam-subject';
import { StudentListByExamSubjectRequest } from 'src/app/school-erp/common/shared/request/exam-result/student-list-by-exam-subject-request';
import { StudentListByExamSubjectRequestBody } from 'src/app/school-erp/common/shared/request/exam-result/student-list-by-exam-subject-request-body';
import { StudentListByExamSubjectResponseBody } from 'src/app/school-erp/common/shared/response/exam-result/student-list-by-exam-subject-response-body';
import { StudentListByExamSubject } from 'src/app/school-erp/common/shared/model/exam-result/student-list-by-exam-subject';
import { AppClassTermService } from 'src/app/school-erp/common/shared/services/class-term/app-class-term.service';
import { GetInstituteClassTermListRequest } from 'src/app/school-erp/common/shared/request/class-term/get-institute-class-term-list-request';
import { GetInstituteClassTermListRequestBody } from 'src/app/school-erp/common/shared/request/class-term/get-institute-class-term-list-request-body';
import { GetInstituteClassTermListResponseBody } from 'src/app/school-erp/common/shared/response/class-term/get-institute-class-term-list-response-body';
import { ClassTermList } from 'src/app/school-erp/common/shared/model/class-term/class-term-list';
import { GetClassSettingRequest } from 'src/app/school-erp/common/shared/request/class-setting/get-class-setting-request';
import { GetClassSettingRequestBody } from 'src/app/school-erp/common/shared/request/class-setting/get-class-setting-request-body';
import { ClassSettingService } from 'src/app/school-erp/common/shared/services/class-setting/class-setting.service';
import { InstituteClassSetting } from 'src/app/school-erp/common/shared/model/class-setting/class-setting';
import { SubjectSettingRequest } from 'src/app/school-erp/common/shared/request/subject-setting/subject-setting-request';
import { SubjectSettingRequestBody } from 'src/app/school-erp/common/shared/request/subject-setting/subject-setting-request-body';
import { SubjectSetting } from 'src/app/school-erp/common/shared/model/subject-setting/subject-setting';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassSubjectService } from 'src/app/school-erp/common/shared/services/subject/class-subject.service';

@Component({
  selector: 'app-school-exam-result-add',
  templateUrl: './school-exam-result-add.component.html',
  styleUrls: ['./school-exam-result-add.component.scss']
})
export class SchoolExamResultAddComponent implements OnInit {
  public locale: any;
  public requestHeader: RequestHeader = new RequestHeader();
  // public entity: { examOid: string, classOid: string, versionOid: string };
  public entity = { examOid: null, classOid: null, termOid: null, versionOid: null, educationSubjectOid: null, textBookOid: null, totalMarks: null, shiftOid: null, sectionOid: null };
  public userInfo: UserInfo = new UserInfo();
  public header: Header = new Header();

  public studentListByExamTextbook: StudentListByExamTextbook[] = [];
  public selectedStudentList: StudentListByExamSubject[] = [];
  public studentListByExamSubject: StudentListByExamSubject[] = [];
  public classSubjectList: ClassSubjectList[];
  public examSubjectList: ExamSubject[] = [];

  public examList: ExamList[];
  public examTimeList: ExamTime[] = [];
  public examClassList: ExamClass[] = [];
  public exam: GetExamByOidResponseBody = new GetExamByOidResponseBody();
  public examTextBookList: SchoolExamClassTextBook[] = [];
  public instituteVersionList: InstituteVersionEntity[] = [];

  public instituteShiftList: InstituteShiftEntity[] = [];
  public instituteClassSectionList: InstituteClassSection[] = [];
  public selectedClassSectionList: InstituteClassSection[] = [];

  public examListRequest: ExamListBySectionRequest = new ExamListBySectionRequest();
  public examListHeader: RequestHeader = new RequestHeader();
  public examListRequestBody: ExamListBySectionRequestBody = new ExamListBySectionRequestBody();

  public getExamByOidRequest: GetExamByOidRequest = new GetExamByOidRequest();
  public getExamByOidRequestBody: GetExamByOidRequestBody = new GetExamByOidRequestBody();
  public examDetails: GetExamByOidResponseBody = new GetExamByOidResponseBody();

  public getStudentListByExamTextBookRequest: StudentListByExamTextbookRequest = new StudentListByExamTextbookRequest();
  public getStudentListByExamTextBookRequestBody: StudentListByExamTextbookRequestBody = new StudentListByExamTextbookRequestBody();
  public getStudentListByExamTextbookResponse: StudentListByExamTextbookResponseBody = new StudentListByExamTextbookResponseBody();


  public studentListByExamSubjectRequest: StudentListByExamSubjectRequest = new StudentListByExamSubjectRequest();
  public studentListByExamSubjectRequestBody: StudentListByExamSubjectRequestBody = new StudentListByExamSubjectRequestBody();
  public studentListByExamSubjectResponseBody: StudentListByExamSubjectResponseBody = new StudentListByExamSubjectResponseBody();


  public getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  public getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();

  public selectedChildExamRoutine: any;
  public selectedExamForRoutine: any;
  public selectedClassForRoutine: any;
  public selectedTextbookForRoutine: any;

  public isTotalMarks: boolean = false;
  public isShowShift: boolean = false;
  public isShowSection: boolean = false;

  constructor(
    private _appStorageService: AppStorageService,
    private instituteService: InstituteService,
    private toastr: ToastrService,
    private router: Router,
    private _translate: TranslateService,
    private examResultService: ExamResultService,
    private examService: ExamService,
    private constantService: ConstantService,
    private appClassTermService: AppClassTermService,
    private classSettingService: ClassSettingService,
    private _spinner: NgxSpinnerService,
    private classSubjectService: ClassSubjectService,
    private _toastr: ToastrService,
  ) { }

  public saveExamResultRequest: SaveExamResultRequest = new SaveExamResultRequest();
  public saveExamResultRequestBody: SaveExamResultRequestBody = new SaveExamResultRequestBody();

  public classSubjectListRequest: ClassSubjectListRequest = new ClassSubjectListRequest();
  public classSubjectListRequestBody: ClassSubjectListRequestBody = new ClassSubjectListRequestBody();
  public classSubjectListResponseBody: ClassSubjectListResponseBody = new ClassSubjectListResponseBody();

  getClassSubjectList() {
    this.examSubjectList = [];
    if (!this.constantService.isNullOrEmpty(this.entity.classOid)) {
      var list = _.where(this.exam.examSubjectList, { instituteClassOid: this.entity.classOid })
      this.examSubjectList = list;
    }
    this.filterSectionList();
  }

  saveData() {

    this.saveExamResultRequest.header = this.header;

    this.saveExamResultRequestBody.examOid = this.exam.oid;
    this.saveExamResultRequestBody.instituteSessionOid = this.exam.instituteSessionOid;
    this.saveExamResultRequestBody.instituteOid = this.exam.institutOid;
    this.saveExamResultRequestBody.educationSubjectOid = this.entity.educationSubjectOid;
    this.saveExamResultRequestBody.instituteClassOid = this.entity.classOid;
    this.saveExamResultRequestBody.instituteVersionOid = this.entity.versionOid;
    this.saveExamResultRequestBody.totalMarks = this.entity.totalMarks;
    this.saveExamResultRequestBody.createdBy = this.userInfo.loginId;
    this.saveExamResultRequestBody.resultMarkList = this.studentListByExamSubject;
    this.saveExamResultRequestBody.termOid = this.entity.termOid;

    this.saveExamResultRequest.body = this.saveExamResultRequestBody;

    if (!this.isValid()) {
      return;
    }
    this.examResultService.saveExamResult(this.saveExamResultRequest).subscribe((data) => {
      if (data.header.responseCode === "200") {
        this.toastr.success('Add Result Successfully');
        this.router.navigate(['/school/exam-result/list']);
      }
    })

  }

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
    this.getInstituteInformation();
  }

  isValid() {
    if (this.saveExamResultRequestBody.termOid == null || this.saveExamResultRequestBody.termOid == undefined) {
      this.toastr.error("Please select the term of the exam")
      return false;
    }
    if (this.saveExamResultRequestBody.resultMarkList.length < 1) {
      this.toastr.error("There is no student to save result.")
      return false;
    }


    if (this.instituteClassSetting.oid == null) {
      this._toastr.error("Please prepare some class setting first!")
      return false;
    }

    if (this.subjectMarkDistributions.oid == null) {
      this._toastr.error("Please prepare subject setting of this subject first!")
      return false;
    }
    return true;
  }


  getInstituteInformation() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteInfoRequest.header = this.requestHeader;
    this.getInstituteInfoRequest.body = this.getInstituteInfoRequestBody;
    this.getInstituteInfoRequest.body.oid = this.userInfo.instituteOid;

    this.instituteService.getInstituteInfo(this.getInstituteInfoRequest).subscribe((data) => {
      if (data.header.responseCode == "200") {
        this.instituteVersionList = data.body.versionList;
        this.instituteShiftList = data.body.shiftList;
        this.instituteClassSectionList = data.body.sectionList;

        if (this.instituteVersionList.length == 1) {
          this.entity.versionOid = this.instituteVersionList[0].oid;
        }
        if (this.instituteShiftList.length == 1) {
          this.entity.shiftOid = this.instituteShiftList[0].oid;
        }
        this.getExamBySection();
      }
    }, (error) => {
      console.log(error);
    }
    );
  }

  getExamBySection() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.examListRequest.header = this.requestHeader;
    this.examListRequest.body = this.examListRequestBody;
    this.examListRequest.body.status = 'Published';
    this.examService.getExamListBySection(this.examListRequest).subscribe(data => {
      this.examList = data.body.examList;
    },
      (error) => {
        console.log(error);
      });
  }

  getExamByOid(examOid: string) {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getExamByOidRequest.header = this.requestHeader;
    this.getExamByOidRequest.body = this.getExamByOidRequestBody;
    this.getExamByOidRequestBody.oid = examOid;

    this.examService.getExamByOid(this.getExamByOidRequest).subscribe(data => {
      if (data.header.responseCode == "200") {
        this.exam = data.body;
        this.studentListByExamSubject = [];
        this.entity.termOid = this.exam.termOid;
        // this.entity.classOid = this.exam.examClassList[0].oid;

        console.log(this.exam.examClassList.length);

        this.entity.classOid = null;

        // if (this.exam.examClassList.length === 1) {
        //   this.entity.classOid = this.exam.examClassList[0].oid;
        // }
        this.getClassTermList();

      }
    });
  }

  getClassTextBookList() {
    this.examTextBookList = [];
    if (!this.constantService.isNullOrEmpty(this.entity.classOid) && !this.constantService.isNullOrEmpty(this.entity.versionOid)) {
      var classObject = _.where(this.exam.examTextBookList, { instituteClassOid: this.entity.classOid, versionOid: this.entity.versionOid })
      this.examTextBookList = classObject;
    }
  }


  getTotalMarksWithStudent(textbookOid) {
    if (!this.constantService.isNullOrEmpty(this.entity.textBookOid)) {
      var marksObj = _.where(this.examTextBookList, { oid: textbookOid })
      this.entity.totalMarks = marksObj[0].totalMarks;
      this.isTotalMarks = true;
      this.isShowShift = true;
    }
    this.getStudentListByExamSubject();
    this.getClassSetting();
    this.getInstituteClassSubjectListByClassOid();

  }

  getStudentListByExamSubject() {
    this.studentListByExamSubjectRequest.header = this.header;
    this.studentListByExamSubjectRequestBody.examOid = this.entity.examOid;
    this.studentListByExamSubjectRequestBody.instituteClassOid = this.entity.classOid;
    this.studentListByExamSubjectRequestBody.educationSubjectOid = this.entity.educationSubjectOid;;
    this.studentListByExamSubjectRequestBody.instituteSectionOid = this.entity.sectionOid != null ? this.entity.sectionOid : '';
    this.studentListByExamSubjectRequestBody.instituteShiftOid = this.entity.shiftOid;
    this.studentListByExamSubjectRequestBody.instituteVersionOid = this.entity.versionOid;

    this.studentListByExamSubjectRequest.body = this.studentListByExamSubjectRequestBody;

    this.examResultService.getStudentListByExamSubject(this.studentListByExamSubjectRequest).subscribe(data => {
      if (data.header.responseCode == "200") {
        this.studentListByExamSubjectResponseBody = data.body;
        this.studentListByExamSubject = data.body.examSubjectList;
        this.selectedStudentList = this.studentListByExamSubject;
      }
    });

  }


  classTermListRequest: GetInstituteClassTermListRequest = new GetInstituteClassTermListRequest();
  public classTermListRequestBody: GetInstituteClassTermListRequestBody = new GetInstituteClassTermListRequestBody();
  public classTermListResponseBody: GetInstituteClassTermListResponseBody = new GetInstituteClassTermListResponseBody();
  public classTermList: ClassTermList[] = [];


  getClassTermList() {
    this.classTermListRequestBody.instituteOid = this.userInfo.instituteOid;
    this.classTermListRequestBody.instituteSessionOid = this.exam.sessionOid;
    this.classTermListRequestBody.instituteVersionOid = this.entity.versionOid;
    this.classTermListRequestBody.instituteClassOid = this.entity.classOid;

    this.classTermListRequest.header = this.header;
    this.classTermListRequest.body = this.classTermListRequestBody;

    this.appClassTermService.getClassTermList(this.classTermListRequest).subscribe(
      (data) => {
        if (data.header.responseCode === '200') {
          this.classTermList = data.body.instituteClassTermList;
        } (error) => {
          console.log(error);
          this.toastr.error(error.Message);
        }
      }
    );

  }

  filterSectionList() {
    if (!this.constantService.isNullOrEmpty(this.entity.classOid) && !this.constantService.isNullOrEmpty(this.entity.versionOid) && !this.constantService.isNullOrEmpty(this.entity.shiftOid) && !this.constantService.isNullOrEmpty(this.exam.sessionOid)) {
      var sectionObj = _.where(this.instituteClassSectionList, { instituteClassOid: this.entity.classOid, instituteSessionOid: this.exam.sessionOid, instituteShiftOid: this.entity.shiftOid, instituteVersionOid: this.entity.versionOid })
      this.selectedClassSectionList = [];
      this.selectedClassSectionList = sectionObj;

      this.isShowSection = true;

      var studentListObj = _.where(this.studentListByExamSubject, { shiftOid: this.entity.shiftOid });
      this.selectedStudentList = [];
      this.selectedStudentList = studentListObj;
    }
  }

  filterStudentListBySection() {
    var studentListBySectionObj = _.where(this.studentListByExamSubject, { classSectionOid: this.entity.sectionOid });
    this.selectedStudentList = [];
    this.selectedStudentList = studentListBySectionObj;
    this.getStudentListByExamSubject();
  }


  public getClassSettingRequest: GetClassSettingRequest = new GetClassSettingRequest();
  public getClassSettingRequestBody: GetClassSettingRequestBody = new GetClassSettingRequestBody();
  instituteClassSetting: InstituteClassSetting = new InstituteClassSetting();
  getClassSetting() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getClassSettingRequest.header = this.requestHeader;
    this.getClassSettingRequest.body = this.getClassSettingRequestBody;
    this.getClassSettingRequest.body.instituteOid = this.userInfo.instituteOid;
    this.getClassSettingRequest.body.instituteVersionOid = this.entity.versionOid;
    this.getClassSettingRequest.body.instituteShiftOid = this.entity.shiftOid;
    this.getClassSettingRequest.body.instituteSessionOid = this.exam.sessionOid;
    this.getClassSettingRequest.body.instituteClassOid = this.entity.classOid;
    this.classSettingService.getClassSetting(this.getClassSettingRequest).subscribe((data) => {

      this.instituteClassSetting = new InstituteClassSetting();
      this.instituteClassSetting = data.body;

      if (this.instituteClassSetting.oid == null) {
        this._toastr.error("Please prepare some class setting first!")
      }

      this.instituteClassSetting.instituteOid = this.getClassSettingRequest.body.instituteOid.toString();
      this.instituteClassSetting.instituteVersionOid = this.getClassSettingRequest.body.instituteVersionOid.toString();
      this.instituteClassSetting.instituteShiftOid = this.getClassSettingRequest.body.instituteShiftOid.toString();
      this.instituteClassSetting.instituteSessionOid = this.getClassSettingRequest.body.instituteSessionOid.toString();
      this.instituteClassSetting.instituteClassOid = this.getClassSettingRequest.body.instituteClassOid.toString();

      if (data.body.instituteClassTermList != null && data.body.instituteClassTermList.length > 0) {
        this.instituteClassSetting.instituteClassTermList.map(term => {
          if (term.sba > 0) {
            term.check = true;
          } else {
            term.check = false;
          }
        })
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message);
      }
    );
  }

  public subjectSettingRequest: SubjectSettingRequest = new SubjectSettingRequest();
  public subjectSettingRequestBody: SubjectSettingRequestBody = new SubjectSettingRequestBody();
  public subjectMarkDistributionsList: SubjectSetting[] = [];
  public subjectMarkDistributions: SubjectSetting = new SubjectSetting();
  public ww: any = 0;

  getInstituteClassSubjectListByClassOid() {
    this.subjectSettingRequest.body = this.subjectSettingRequestBody;
    this.subjectSettingRequest.body.instituteOid = this.userInfo.instituteOid;
    this.subjectSettingRequest.body.instituteSessionOid = this.exam.sessionOid;
    this.subjectSettingRequest.body.instituteClassOid = this.entity.classOid;
    this.subjectSettingRequest.body.educationSubjectOid = this.entity.educationSubjectOid;


    this._spinner.show();
    this.classSubjectService.getSubjectSetting(this.subjectSettingRequest).subscribe(data => {
      this._spinner.hide();
      this.subjectMarkDistributionsList = data.body.subjectMarkDistributionsList;
      this.subjectMarkDistributions = this.subjectMarkDistributionsList[0];
      this.ww = this.subjectMarkDistributions.writtenMarks;

      if (this.subjectMarkDistributions.oid == null) {
        this._toastr.error("Please prepare subject setting of this subject first!")
      }
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      });
  }

  vivaMarkLimitCheck(studentList: StudentListByExamSubject) {
    if (studentList.vivaMarks > this.subjectMarkDistributions.vivaMarks) {
      this.toastr.error("You Can't input Viva Mark " + studentList.vivaMarks + ". Please input between 0 to " + this.subjectMarkDistributions.vivaMarks);
      studentList.vivaMarks = 0;
    }
  }

  labMarkLimitCheck(studentList: StudentListByExamSubject) {
    if (studentList.labMarks > this.subjectMarkDistributions.practicalMarks) {
      this.toastr.error("You Can't input Lab Mark " + studentList.labMarks + ". Please input between 0 to " + this.subjectMarkDistributions.practicalMarks);
      studentList.labMarks = 0;
    }
  }

  mcqMarkLimitCheck(studentList: StudentListByExamSubject) {
    if (studentList.mcqMarks > this.subjectMarkDistributions.mcqMarks) {
      this.toastr.error("You Can't input MCQ Mark " + studentList.mcqMarks + ". Please input between 0 to " + this.subjectMarkDistributions.mcqMarks);
      studentList.mcqMarks = 0;
    }
  }

  writtenMarkLimitCheck(studentList: StudentListByExamSubject) {
    if (studentList.writtenMarks > this.subjectMarkDistributions.writtenMarks) {
      this.toastr.error("You Can't input Written Mark" + studentList.writtenMarks + ". Please input between 0 to " + this.subjectMarkDistributions.writtenMarks);
      studentList.writtenMarks = 0;
    }
  }

}
