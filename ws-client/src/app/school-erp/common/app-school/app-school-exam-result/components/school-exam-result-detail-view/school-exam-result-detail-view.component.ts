import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { ConstantService } from 'src/app/common/services/constant.service';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ExamResultDetailByOidRequest } from 'src/app/school-erp/common/shared/request/exam-result/get-exam-result-detail-request';
import { ExamResultDetailByOidRequestBody } from 'src/app/school-erp/common/shared/request/exam-result/get-exam-result-detail-request-body';
import { ExamResultDetailByOidResponseBody } from 'src/app/school-erp/common/shared/response/exam-result/get-exam-result-detail-response-body';
import { ExamResultService } from 'src/app/school-erp/common/shared/services/exam-result/exam-result.service';
import { StudentListForResult } from 'src/app/school-erp/common/shared/model/exam-result/student-list-for-result';
import { ResultMarksListForStudent } from 'src/app/school-erp/common/shared/model/exam-result/result-marks-list-for-student';
import { ExamMarkSheetReportRequest } from 'src/app/school-erp/common/shared/request/exam-result/exam-mark-sheet-report-request';
import { ExamMarkSheetReportRequestBody } from 'src/app/school-erp/common/shared/request/exam-result/exam-mark-sheet-report-request-body';
import { ExamMarkSheetReportResponse } from 'src/app/school-erp/common/shared/response/exam-result/exam-mark-sheet-report-response';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-school-exam-result-detail-view',
  templateUrl: './school-exam-result-detail-view.component.html',
  styleUrls: ['./school-exam-result-detail-view.component.scss']
})
export class SchoolExamResultDetailViewComponent implements OnInit {

  public locale: any;
  public header: Header = new Header();
  public entity: ExamResultDetailByOidResponseBody = new ExamResultDetailByOidResponseBody();
  public userInfo: UserInfo = new UserInfo();

  public requestHeader: RequestHeader = new RequestHeader();

  public examResultDetailByOidRequest: ExamResultDetailByOidRequest = new ExamResultDetailByOidRequest();
  public examResultDetailByOidRequestBody: ExamResultDetailByOidRequestBody = new ExamResultDetailByOidRequestBody();

  public studentListForResult: StudentListForResult[];
  public resultMarksListForStudent: ResultMarksListForStudent[];

  public examMarkSheetReportRequest: ExamMarkSheetReportRequest = new ExamMarkSheetReportRequest();
  public examMarkSheetReportRequestBody: ExamMarkSheetReportRequestBody = new ExamMarkSheetReportRequestBody();
  public examMarkSheetReportResponse: ExamMarkSheetReportResponse = new ExamMarkSheetReportResponse();

  constructor(
    private _appStorageService: AppStorageService,
    private examResultService: ExamResultService,
    private _translate: TranslateService,
    private _location: Location,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private _spinner: NgxSpinnerService,
  ) { }

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
    this.getExamResultListBySection();
  }

  getExamResultListBySection() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.examResultDetailByOidRequest.header = this.requestHeader;
    this.examResultDetailByOidRequest.body = this.examResultDetailByOidRequestBody;
    this.examResultDetailByOidRequest.body.oid = this._route.snapshot.params["oid"];

    this.examResultService
      .getExamResultListBySection(this.examResultDetailByOidRequest)
      .subscribe((data) => {
        this.entity = data.body;
        this.studentListForResult = data.body.studentList;
      },
        (error: any) => {
          console.log(error);
        }
      );
  }

  downloadExamResult(studentId: string) {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.examMarkSheetReportRequestBody.examOid = this.entity.examOid;
    this.examMarkSheetReportRequestBody.instituteOid = this.entity.instituteOid;
    this.examMarkSheetReportRequestBody.studentId = studentId;
    this.examMarkSheetReportRequestBody.lang = 'en';

    this.examMarkSheetReportRequest.header = this.requestHeader;
    this.examMarkSheetReportRequest.body = this.examMarkSheetReportRequestBody;

    this._spinner.show()
    // this._reportMakerService.getExamMarkSheetReportByStudentId(this.examMarkSheetReportRequest)
    //   .subscribe(data => this._spinner.hide(),
    //     error => this._spinner.hide());
  }

  goBack() {
    this._location.back();
  }

}
