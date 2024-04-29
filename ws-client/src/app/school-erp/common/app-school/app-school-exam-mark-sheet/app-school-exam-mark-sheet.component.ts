import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { StudentList } from 'src/app/school-erp/common/shared/model/student/student-list';
import { AppStudentService } from 'src/app/school-erp/common/shared/services/student/app-student.service';
import { StudentRequestList } from 'src/app/school-erp/common/shared/request/student/student-request-list';
import { RequestHeader } from 'src/app/login/shared/model/keycloak-user-info/Header/request-header';
import { StudentRequestListBody } from 'src/app/school-erp/common/shared/request/student/student-request-list-body';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { InstituteClassEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-entity';
import { InstituteShiftEntity } from 'src/app/school-erp/common/shared/model/institute/institute-shift-entity';
import { ConstantService } from 'src/app/common/services/constant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerConfiguration } from 'src/app/school-erp/common/shared/model/ngx-spinner-configuration';
import { InstituteVersionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-version-entity';
import { InstituteSessionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-session-entity';
import { InstituteClassGroupEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-group-entity';
import { InstituteClassSectionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-section-entity';
import { ClassGroupListByClassSessionRequest } from 'src/app/school-erp/common/shared/request/class-group/class-group-list-by-class-session-request';
import { ClassGroupListByClassSessionRequestBody } from 'src/app/school-erp/common/shared/request/class-group/class-group-list-by-class-session-request-body';
import { GetInstituteInfoResponseBody } from 'src/app/school-erp/common/shared/response/institute/get-institute-info-response-body';
import { AppClassGroupService } from 'src/app/school-erp/common/shared/services/class-group/app-class-group.service';
import * as _ from 'underscore';
import { ClassGroupDetails } from 'src/app/school-erp/common/shared/model/class-group/class-group-details';
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';
import { InstituteListRequest } from 'src/app/school-erp/common/shared/request/institute/institute-list-request';
import { InstituteListRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-list-request-body';
import { GetClassListBySessionOidRequestBody } from 'src/app/school-erp/common/shared/request/class/get-class-list-by-session-oid-request-body';
import { GetClassListBySessionOidRequest } from 'src/app/school-erp/common/shared/request/class/get-class-list-by-session-oid-request';
import { ClassService } from 'src/app/school-erp/common/shared/services/class/class.service';
import { InstituteClassTerm } from '../../shared/model/class-setting/institute-class-term';
import { GetInstituteClassTermListRequest } from '../../shared/request/class-term/get-institute-class-term-list-request';
import { GetInstituteClassTermListRequestBody } from '../../shared/request/class-term/get-institute-class-term-list-request-body';
import { GetInstituteClassTermListResponseBody } from '../../shared/response/class-term/get-institute-class-term-list-response-body';
import { ClassTermList } from '../../shared/model/class-term/class-term-list';
import { AppClassTermService } from '../../shared/services/class-term/app-class-term.service';
import { CreateExamResultMarkSheetRequest } from '../../shared/request/mark-sheet/create-exam-result-mark-sheet-request';
import { CreateExamResultMarkSheetRequestBody } from '../../shared/request/mark-sheet/create-exam-result-mark-sheet-request-body';
import { CreateExamResultMarkSheetResponseBody } from '../../shared/response/exam-mark-sheet/create-exam-result-mark-sheet-response-body';
import { ExamMarkSheetService } from '../../shared/services/exam-mark-sheet/exam-mark-sheet.service';
import { ExamService } from '../../shared/services/exam/exam.service';
import { ExamListRequest } from '../../shared/request/exam/exam-list-request';
import { ExamListRequestBody } from '../../shared/request/exam/exam-list-request-body';
import { ExamList } from '../../shared/model/exam/exam-list';
import { TermInfo } from '../../shared/model/exam-mark-sheet/term-info';
import { CreateFinalExamMarkSheetRequest } from '../../shared/request/mark-sheet/create-final-exam-mark-sheet-request';
import { CreateFinalExamMarkSheetRequestBody } from '../../shared/request/mark-sheet/create-final-exam-mark-sheet-request-body';
import { CreateFinalExamResultMarkSheetResponseBody } from '../../shared/response/exam-mark-sheet/create-final-exam-result-mark-sheet-response-body';
import { FinalTermInfo } from '../../shared/model/exam-mark-sheet/final-term-info';
import { FinalSubjectMark } from '../../shared/model/exam-mark-sheet/final-subject-mark';
import { SubjectName } from '../../shared/model/exam-mark-sheet/subject-name';

@Component({
  selector: 'app-app-school-exam-mark-sheet',
  templateUrl: './app-school-exam-mark-sheet.component.html',
  styleUrls: ['./app-school-exam-mark-sheet.component.scss']
})
export class AppSchoolExamMarkSheetComponent implements OnInit {

  constructor(
    private _studentListService: AppStudentService,
    private _instituteService: InstituteService,
    private _classGroupService: AppClassGroupService,
    private _constantService: ConstantService,
    private _translate: TranslateService,
    private _toastr: ToastrService,
    private _appStorageService: AppStorageService,
    private _spinner: NgxSpinnerService,
    private _classService: ClassService,
    private appClassTermService: AppClassTermService,
    private examMarkSheetService: ExamMarkSheetService,
    private _examService: ExamService

  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }
  spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() receivedInstituteOid: string;
  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  public filteredClassList: InstituteClassEntity[];

  public studentList: StudentList[];

  header: Header = new Header();
  requestHeader: RequestHeader = new RequestHeader();

  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  param1: any;
  param2: any;
  classFilter1 = new FormControl('');
  classFilter2 = new FormControl('');

  public selectedInstitute: string;
  getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();


  exam_result: string = "Term Exam Result";

  examTypeData = [
    { nameEn: "Term Exam Result", nameBn: "মেয়াদী পরীক্ষার ফলাফল" },
    { nameEn: "Final Exam Result", nameBn: "চূড়ান্ত পরীক্ষার ফলাফল" }
  ]

  ngOnInit(): void {
    this.locale = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });

    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    if (!this._constantService.isNullOrEmpty(this.receivedInstituteOid)) {
      this.selectedInstitute = this.receivedInstituteOid;
      this.getInstituteList();
    } else {
      this.selectedInstitute = this.userInfo.instituteOid;
      this.getInstituteInformation();
    }

  }

  public instituteList: InstituteList[];
  instituteListRequest: InstituteListRequest = new InstituteListRequest();
  public instituteListRequestBody: InstituteListRequestBody = new InstituteListRequestBody();
  getInstituteList() {
    this.requestHeader = this.header;
    this.instituteListRequest.body = this.instituteListRequestBody;

    this._instituteService.getInstituteList(this.instituteListRequest).subscribe((data) => {
      this.instituteList = data.body.instituteList;
      this.selectedInstitute = this.instituteList[0].oid;
      this.getInstituteInformation();

    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });
  }

  public examList: ExamList[];
  public examListRequest: ExamListRequest = new ExamListRequest();
  public examListRequestBody: ExamListRequestBody = new ExamListRequestBody();

  getExamList(sessionOid: string) {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.examListRequest.header = this.requestHeader;
    this.examListRequest.body = this.examListRequestBody;
    this.examListRequestBody.instituteSessionOid = sessionOid;
    this.examListRequest.body.instituteOid = this.userInfo.instituteOid;
    this._spinner.show();
    this._examService.getExamList(this.examListRequest).subscribe(data => {
      this._spinner.hide();
      if (data.header.responseCode == "200") {
        this.examList = data.body.examList;
        this.getStudentList('');
      }
    },
      (error) => {
        this._spinner.hide();
        console.log(error);
        this._toastr.error(error.Message);
      });
  }

  markSheetGenerate() {
    this.totalFinalGpa = 0;
    this.fail = false;
    this.count = 0;
    if (this.exam_result === 'Final Exam Result') {

      if (this._constantService.isNullOrEmpty(this.selectedSession)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Session");
        } else {
          this._toastr.error("অনুগ্রহ করে সেশন নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedVersion)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Version");
        } else {
          this._toastr.error("অনুগ্রহ করে সংস্করণ নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedShift)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Shift");
        } else {
          this._toastr.error("অনুগ্রহ করে শিফট নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedClass)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Class");
        } else {
          this._toastr.error("অনুগ্রহ করে ক্লাস নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedStudentId)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Student");
        } else {
          this._toastr.error("অনুগ্রহ করে ছাত্র নির্বাচন করুন");
        }
      } else {
        this.getFinalExamMarkSheet();
      }

    } else {
      if (this._constantService.isNullOrEmpty(this.selectedSession)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Session");
        } else {
          this._toastr.error("অনুগ্রহ করে সেশন নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedVersion)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Version");
        } else {
          this._toastr.error("অনুগ্রহ করে সংস্করণ নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedShift)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Shift");
        } else {
          this._toastr.error("অনুগ্রহ করে শিফট নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedClass)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Class");
        } else {
          this._toastr.error("অনুগ্রহ করে ক্লাস নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.sleectExamOid)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Exam");
        } else {
          this._toastr.error("অনুগ্রহ করে পরীক্ষা নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedTermOid)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Term");
        } else {
          this._toastr.error("অনুগ্রহ করে মেয়াদ নির্বাচন করুন");
        }
      } else if (this._constantService.isNullOrEmpty(this.selectedStudentId)) {
        if (this.locale = "en") {
          this._toastr.error("Please Select Student");
        } else {
          this._toastr.error("অনুগ্রহ করে ছাত্র নির্বাচন করুন");
        }
      } else {
        this.getExamMarkSheet();
      }
    }
  }

  fail: boolean = false;
  selectedTermOid: string;
  selectedStudentId: string;
  sleectExamOid: string;
  show_result: boolean = false;
  totalGpa: number = 0;
  totalMarks: number = 0;
  latterGrade: string = '';
  createExamResultMarkSheetRequest: CreateExamResultMarkSheetRequest = new CreateExamResultMarkSheetRequest();
  createExamResultMarkSheetRequestBody: CreateExamResultMarkSheetRequestBody = new CreateExamResultMarkSheetRequestBody();
  markSheet: CreateExamResultMarkSheetResponseBody = new CreateExamResultMarkSheetResponseBody();
  termInfo: TermInfo = new TermInfo();
  getExamMarkSheet() {
    this.totalGpa = 0;
    this.totalMarks = 0;
    this.latterGrade = '';
    this.createExamResultMarkSheetRequestBody.examOid = this.sleectExamOid;
    this.createExamResultMarkSheetRequestBody.instituteClassTermOid = this.selectedTermOid;
    this.createExamResultMarkSheetRequestBody.studentId = this.selectedStudentId;
    this.createExamResultMarkSheetRequest.header = this.header;
    this.createExamResultMarkSheetRequest.body = this.createExamResultMarkSheetRequestBody;

    this.examMarkSheetService.createExamMarkSheet(this.createExamResultMarkSheetRequest).subscribe((data) => {
      if (data.header.responseCode == '200') {
        this.markSheet = data.body;
        let tg = 0;
        this.markSheet.subjectMarkList.map(res => {
          tg += res.gradePoint;
          this.totalMarks += res.totalObtainedMarks;
          if (res.gradePoint == 0) {
            this.fail = true;
          }
        })

        this.totalGpa = tg / this.markSheet.subjectMarkList.length;
        this.termInfo = this.markSheet.termInfo;
        this.show_result = true;
        this.show_final_result = false;
      }
      if (this.totalGpa == 5) {
        this.latterGrade = 'A+';
      } else if (this.totalGpa >= 3.5 && this.totalGpa <= 4.99) {
        this.latterGrade = 'A';
      } else if (this.totalGpa >= 4 && this.totalGpa <= 4.49) {
        this.latterGrade = 'A-';
      } else if (this.totalGpa >= 3 && this.totalGpa <= 3.99) {
        this.latterGrade = 'B';
      } else if (this.totalGpa >= 2 && this.totalGpa <= 2.99) {
        this.latterGrade = 'C';
      } else if (this.totalGpa >= 1 && this.totalGpa <= 1.99) {
        this.latterGrade = 'D';
      } else {
        this.latterGrade = 'F';
      }

      if (this.fail) {
        this.totalGpa = 0;
        this.latterGrade = 'F';
      }


    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });
  }


  createFinalExamResultMarkSheetRequest: CreateFinalExamMarkSheetRequest = new CreateFinalExamMarkSheetRequest();
  createFinalExamResultMarkSheetRequestBody: CreateFinalExamMarkSheetRequestBody = new CreateFinalExamMarkSheetRequestBody();
  finalMarkSheet: CreateFinalExamResultMarkSheetResponseBody = new CreateFinalExamResultMarkSheetResponseBody();
  show_final_result: boolean = false;
  dynamicallyColSpan: number;
  dynamicallyColSpanForTotal: number;

  getFinalExamMarkSheet() {
    this.createFinalExamResultMarkSheetRequestBody.examOid = this.sleectExamOid;
    this.createFinalExamResultMarkSheetRequestBody.instituteClassOid = this.selectedClass;
    this.createFinalExamResultMarkSheetRequestBody.instituteClassTermOid = this.selectedTermOid;
    this.createFinalExamResultMarkSheetRequestBody.studentId = this.selectedStudentId;
    this.createFinalExamResultMarkSheetRequest.header = this.header;
    this.createFinalExamResultMarkSheetRequest.body = this.createFinalExamResultMarkSheetRequestBody;

    this.examMarkSheetService.createFinalExamMarkSheet(this.createFinalExamResultMarkSheetRequest).subscribe((data) => {
      if (data.header.responseCode == '200') {
        this.finalMarkSheet = data.body;
        this.show_final_result = true;
        this.show_result = false;

        this.dynamicallyColSpan = (this.finalMarkSheet.termList.length * 2) - 1;
        this.dynamicallyColSpanForTotal = (this.finalMarkSheet.termList.length * 2) + 2;

      }
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });
  }

  calculateTotalObtainNumber(subject: SubjectName) {
    let totalObtainMark = 0;
    this.finalMarkSheet.termList.map(res => {
      res.subjectMarkList.map(m => {
        if (subject.educationSubjectOid === m.educationSubjectOid) {
          totalObtainMark += m.totalObtainedMarks;
        }
      })
    });
    totalObtainMark = Math.ceil(totalObtainMark / this.finalMarkSheet.termList.length);
    return totalObtainMark;
  }

  getSubjectMark(subject: SubjectName) {
    let subjectMark = 0;
    this.finalMarkSheet.termList.map(res => {
      res.subjectMarkList.map(m => {
        if (subject.educationSubjectOid === m.educationSubjectOid) {
          subjectMark = m.totalMarks;
          return subjectMark;
        }
      })
    });
    return subjectMark;
  }

  calculateGradingLatterSystem(subject: SubjectName) {
    let totalMark = 0;
    let grade = '';
    this.finalMarkSheet.termList.map(res => {
      res.subjectMarkList.map(m => {
        if (subject.educationSubjectOid === m.educationSubjectOid) {
          totalMark += m.totalObtainedMarks;
        }
      })
    });

    totalMark = Math.ceil(totalMark / this.finalMarkSheet.termList.length);

    if (totalMark >= 80 && totalMark <= 100) {
      grade = 'A+';
    } else if (totalMark >= 70 && totalMark <= 79) {
      grade = 'A';
    } else if (totalMark >= 60 && totalMark <= 69) {
      grade = 'A-';
    } else if (totalMark >= 50 && totalMark <= 59) {
      grade = 'B';
    } else if (totalMark >= 40 && totalMark <= 49) {
      grade = 'C';
    } else if (totalMark >= 33 && totalMark <= 39) {
      grade = 'D';
    } else {
      grade = 'F';
    }
    return grade;
  }

  totalFinalGpa: number = 0;
  count: number = 0;
  calculateGradingPointSystem(subject: SubjectName) {
    let totalMark = 0;
    let gradePoint = 0;
    this.finalMarkSheet.termList.map(res => {
      res.subjectMarkList.map(m => {
        if (subject.educationSubjectOid === m.educationSubjectOid) {
          totalMark += m.totalObtainedMarks;
        }
      })
    });

    totalMark = Math.ceil(totalMark / this.finalMarkSheet.termList.length);

    if (totalMark >= 80 && totalMark <= 100) {
      gradePoint = 5;
    } else if (totalMark >= 70 && totalMark <= 79) {
      gradePoint = 4;
    } else if (totalMark >= 60 && totalMark <= 69) {
      gradePoint = 3.5;
    } else if (totalMark >= 50 && totalMark <= 59) {
      gradePoint = 3;
    } else if (totalMark >= 40 && totalMark <= 49) {
      gradePoint = 2;
    } else if (totalMark >= 33 && totalMark <= 39) {
      gradePoint = 1;
    } else {
      gradePoint = 0;
      this.fail = true;
    }
    this.count++;
    this.totalFinalGpa += gradePoint;
    if (this.fail) {
      this.count = 0;
      this.totalFinalGpa = 0;
    }

    return gradePoint;
  }



  calculateTotalFinalObtainMark() {
    let totalMark = 0;
    this.finalMarkSheet.termList.map(res => {
      res.subjectMarkList.map(m => {
        totalMark += m.totalObtainedMarks;
      })
    });
    totalMark = Math.ceil(totalMark / this.finalMarkSheet.termList.length);
    return totalMark;
  }

  calculateTotalFinalGPA() {
    if (this.totalFinalGpa != 0)
      return this.totalFinalGpa / this.count;
    else {
      return 0;
    }
  }

  calculateTotalFinalLatterGrade() {

    let gpa = this.totalFinalGpa / this.count

    let gradeLatter
    if (gpa == 5) {
      gradeLatter = 'A+';
    } else if (gpa >= 3.5 && gpa <= 4.99) {
      gradeLatter = 'A';
    } else if (gpa >= 4 && gpa <= 4.49) {
      gradeLatter = 'A-';
    } else if (gpa >= 3 && gpa <= 3.99) {
      gradeLatter = 'B';
    } else if (gpa >= 2 && gpa <= 2.99) {
      gradeLatter = 'C';
    } else if (gpa >= 1 && gpa <= 1.99) {
      gradeLatter = 'D';
    } else {
      gradeLatter = 'F';
    }
    return gradeLatter;
  }

  public isShowSelectVersion: boolean = false;
  public isShowSelectShift: boolean = false;
  public instituteInfo: GetInstituteInfoResponseBody = new GetInstituteInfoResponseBody();
  public versionList: InstituteVersionEntity[];
  public sessionList: InstituteSessionEntity[];
  public shiftList: InstituteShiftEntity[];
  public classList: InstituteClassEntity[];
  public groupList: InstituteClassGroupEntity[];
  public sectionList: InstituteClassSectionEntity[];
  getInstituteInformation() {

    this.selectedVersion = null;
    this.selectedShift = null;
    this.selectedClass = null;
    this.selectedClassGroup = null;
    this.selectedClassSection = null;
    this.isShowClassGroup = false;
    this.isShowSection = false;
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteInfoRequest.header = this.requestHeader;
    this.getInstituteInfoRequest.body = this.getInstituteInfoRequestBody;
    this.getInstituteInfoRequest.body.oid = this.selectedInstitute;

    this._instituteService.getInstituteInfo(this.getInstituteInfoRequest).subscribe((data) => {
      if (data.header.responseCode == "200") {

        this.instituteInfo = data.body;
        this.versionList = data.body.versionList;
        this.sessionList = data.body.sessionList;
        this.shiftList = data.body.shiftList;
        this.classList = data.body.classList;
        if (this.sessionList.length == 1) {
          this.selectedSession = this.sessionList[0].oid;
        }
        if (this.versionList.length == 1) {
          this.selectedVersion = this.versionList[0].oid;
          this.isShowSelectVersion = false;
        } else {
          this.isShowSelectVersion = true;
        }
        if (this.shiftList.length == 1) {
          this.selectedShift = this.shiftList[0].oid;
          this.isShowSelectShift = false;
        } else {
          this.isShowSelectShift = true;
        }
      }
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    }
    );
  }

  loadExamMarkSheet(data: string) {

  }

  public selectedVersion: string;
  public selectedSession: string;
  public selectedShift: string;
  public selectedClass: string;
  public selectedClassGroup: string;
  public selectedClassSection: string;
  studentListRequest: StudentRequestList = new StudentRequestList();
  studentListHeader: RequestHeader = new RequestHeader();
  studentListBody: StudentRequestListBody = new StudentRequestListBody();


  public enableSearchButton: boolean = false;
  public classGroupListByClassSessionRequest: ClassGroupListByClassSessionRequest = new ClassGroupListByClassSessionRequest();
  public classGroupListByClassSessionRequestBody: ClassGroupListByClassSessionRequestBody = new ClassGroupListByClassSessionRequestBody();



  public getClassListBySessionRequest: GetClassListBySessionOidRequest = new GetClassListBySessionOidRequest();
  public getClassListBySessionRequestBody: GetClassListBySessionOidRequestBody = new GetClassListBySessionOidRequestBody();

  loadClassBySession(instituteSessionOid: string) {

    if (!this._constantService.isNullOrEmpty(instituteSessionOid)) {
      this.enableSearchButton = true;
    } else {
      this.enableSearchButton = false;
    }
    this.selectedClass = null;
    this.selectedClassGroup = null;
    this.selectedClassSection = null;
    this.isShowClassGroup = false;
    this.isShowSection = false;


    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.getClassListBySessionRequestBody.instituteSessionOid = instituteSessionOid;

    this.getClassListBySessionRequest.header = this.requestHeader;
    this.getClassListBySessionRequest.body = this.getClassListBySessionRequestBody;

    this._classService.getClassListBySessionOid(this.getClassListBySessionRequest).subscribe((data) => {
      this.classList = [];
      this.classList = data.body.instituteClassList;
      console.log(data.body.instituteClassList);
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });

  }

  getSectionList() {
    this.sectionList = [];
    if (this.classGroupList.length > 0) {
      this.isShowClassGroup = true;
      if (!this._constantService.isNullOrEmpty(this.selectedClassGroup)) {
        this.sectionList = _.where(this.instituteInfo.sectionList, {
          instituteSessionOid: this.selectedSession,
          instituteShiftOid: this.selectedShift,
          instituteVersionOid: this.selectedVersion,
          instituteClassOid: this.selectedClass,
          instituteClassGroupOid: this.selectedClassGroup
        });

      } else {
        this.sectionList = _.where(this.instituteInfo.sectionList, {
          instituteSessionOid: this.selectedSession,
          instituteShiftOid: this.selectedShift,
          instituteVersionOid: this.selectedVersion,
          instituteClassOid: this.selectedClass
        });
      }
    } else {
      this.selectedClassGroup = null;
      this.isShowClassGroup = false;
      this.sectionList = _.where(this.instituteInfo.sectionList, {
        instituteSessionOid: this.selectedSession,
        instituteShiftOid: this.selectedShift,
        instituteVersionOid: this.selectedVersion,
        instituteClassOid: this.selectedClass
      });

    }
    if (this.sectionList.length == 1) {
      this.selectedClassSection = this.sectionList[0].oid;
      this.isShowSection = false;
    } else if (this.sectionList.length == 0) {
      this.selectedClassSection = null;
      this.isShowSection = false;
    }
    else {
      this.isShowSection = true;
    }
  }


  public classGroupList: ClassGroupDetails[];
  public isShowClassGroup: boolean = false;
  loadClassGroup() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.classGroupListByClassSessionRequest.header = this.requestHeader;
    this.classGroupListByClassSessionRequestBody.instituteOid = this.selectedInstitute;
    this.classGroupListByClassSessionRequestBody.sessionOid = this.selectedSession;
    this.classGroupListByClassSessionRequestBody.classOid = this.selectedClass;
    this.classGroupListByClassSessionRequest.body = this.classGroupListByClassSessionRequestBody;

    this._classGroupService.getClassGroupByClassSessionList(this.classGroupListByClassSessionRequest).subscribe((data) => {
      this.classGroupList = data.body.classGroupList;
      if (this.classGroupList.length == 1) {
        this.selectedClassGroup = this.classGroupList[0].oid.toString();
        this.isShowClassGroup = true;
      }
      this.getSectionList();
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });

  }


  public isShowSection: boolean = false;
  loadSectionData(triger: string) {
    if (triger == 'class') {
      this.selectedClassSection = null;
    }
    if (!this._constantService.isNullOrEmpty(this.selectedSession) &&
      !this._constantService.isNullOrEmpty(this.selectedShift) &&
      !this._constantService.isNullOrEmpty(this.selectedVersion) &&
      !this._constantService.isNullOrEmpty(this.selectedClass)) {
      this.loadClassGroup();
    } else {


      this.sectionList = [];
      this.isShowSection = false;
      this.selectedClassGroup = null;
    }
  }

  showStudentList: boolean = false;

  getStudentList(triger: string) {
    this.studentListHeader.requestId = this.header.requestId;
    this.studentListHeader.requestDateTime = this.header.requestDateTime;
    this.studentListHeader.requestSource = this.header.requestSource;
    this.studentListHeader.requestServiceSource = this.header.requestServiceSource;

    this.studentListBody.instituteOid = this.selectedInstitute;
    this.studentListBody.instituteSessionOid = this.selectedSession;
    this.studentListBody.instituteVersionOid = this.selectedVersion;
    this.studentListBody.instituteShiftOid = this.selectedShift;
    this.studentListBody.instituteClassOid = this.selectedClass;
    this.studentListBody.instituteClassGroupOid = this.selectedClassGroup;
    this.studentListBody.sectionOid = this.selectedClassSection;

    this.studentListRequest.header = this.studentListHeader;
    this.studentListRequest.body = this.studentListBody;

    this._studentListService.getStudentList(this.studentListRequest).subscribe(data => {
      this.studentList = data.body.studentList;
      if (triger == 'enhanced') {
        this.selectedSession = null;
        this.selectedVersion = null;
        this.selectedShift = null;
        this.selectedClass = null;
        this.selectedClassGroup = null;
        this.selectedClassSection = null;
        this.getInstituteInformation();
      }

    }, error => this._spinner.hide());
  }

  instituteTermList: InstituteClassTerm[] = [];

  classTermListRequest: GetInstituteClassTermListRequest = new GetInstituteClassTermListRequest();
  public classTermListRequestBody: GetInstituteClassTermListRequestBody = new GetInstituteClassTermListRequestBody();
  public classTermListResponseBody: GetInstituteClassTermListResponseBody = new GetInstituteClassTermListResponseBody();
  public classTermList: ClassTermList[] = [];

  showTerm: boolean = false;
  selecteTermOid: string;
  getClassTermList() {
    this.showTerm = false;
    this.classTermListRequestBody.instituteOid = this.userInfo.instituteOid;
    this.classTermListRequestBody.instituteSessionOid = this.selectedSession;
    this.classTermListRequestBody.instituteVersionOid = this.selectedVersion;
    this.classTermListRequestBody.instituteShiftOid = this.selectedShift;
    this.classTermListRequestBody.instituteClassOid = this.selectedClass;

    this.classTermListRequest.header = this.header;
    this.classTermListRequest.body = this.classTermListRequestBody;


    this.appClassTermService.getClassTermList(this.classTermListRequest).subscribe((data) => {
      if (data.header.responseCode === '200') {
        this.classTermList = data.body.instituteClassTermList;
        if (this.classTermList) {
          this.showTerm = true;
          this.showStudentList = true;
        } else {
          this.showTerm = false;
          this.showStudentList = false;
        }
        this.loadClassGroup();
      } (error) => {
        console.log(error);
        this._toastr.error(error.Message);
      }
    }
    );

  }

}
