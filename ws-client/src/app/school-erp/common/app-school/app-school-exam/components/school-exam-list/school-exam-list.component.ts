import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ExamList } from 'src/app/school-erp/common/shared/model/exam/exam-list';
import { InstituteClassEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-entity';
import { InstituteSessionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-session-entity';
import { ExamListRequest } from 'src/app/school-erp/common/shared/request/exam/exam-list-request';
import { ExamListRequestBody } from 'src/app/school-erp/common/shared/request/exam/exam-list-request-body';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { ExamService } from 'src/app/school-erp/common/shared/services/exam/exam.service';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import * as moment from 'moment';
import { NgxSpinnerConfiguration } from 'src/app/school-erp/common/shared/model/ngx-spinner-configuration';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstantService } from 'src/app/common/services/constant.service';

@Component({
  selector: 'app-school-exam-list',
  templateUrl: './school-exam-list.component.html',
  styleUrls: ['./school-exam-list.component.scss']
})
export class SchoolExamListComponent implements OnInit {
  spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();
  constructor(
    private _examService: ExamService,
    private _router: Router,
    private _toastr: ToastrService,
    private _appStorageService: AppStorageService,
    private _translate: TranslateService,
    private _instituteService: InstituteService,
    private _spinner: NgxSpinnerService,
    private _constantService: ConstantService

  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }

  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public local: any;

  public classList: InstituteClassEntity[] = [];
  public examList: ExamList[];

  public sessionList: InstituteSessionEntity[];


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<ExamList>();
  selection = new SelectionModel<ExamList>(true, []);

  displayedColumns: string[] = ['serialNumber', 'examName', 'startDate', 'endDate', 'examType', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  param: any;
  classFilter = new FormControl('');

  public sessionOid: string;
  filterForm = new FormGroup({
    sessionOid: new FormControl()
  });



  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.local = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });
    this.getExamList(null);

    this.getInstituteInformation();
  }



  public getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  public getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();

  getInstituteInformation() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteInfoRequest.header = this.requestHeader;
    this.getInstituteInfoRequest.body = this.getInstituteInfoRequestBody;
    this.getInstituteInfoRequest.body.oid = this.userInfo.instituteOid;
    this._spinner.show();
    this._instituteService.getInstituteInfo(this.getInstituteInfoRequest).subscribe((data) => {
      this._spinner.hide();
      if (data.header.responseCode == "200") {
        this.sessionList = data.body.sessionList;

      }
    }, (error) => {
      this._spinner.hide();
      console.log(error);
      this._toastr.error(error.Message);
    }
    );
  }



  public requestHeader: RequestHeader = new RequestHeader();
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
        console.log(data.body.examList);
        data.body.examList.forEach((element) => {
          element.startDate = moment(element.startDate).format('DD-MM-YYYY');
          element.endDate = moment(element.endDate).format('DD-MM-YYYY');
        })
        this.dataSource.data = data.body.examList;
      }
    },
      (error) => {
        this._spinner.hide();
        console.log(error);
        this._toastr.error(error.Message);
      });
  }

  examListFilterBySession(sessionOid: any) {
    if (sessionOid == "null") {
      this.getExamList(null);
    } else {
      this.getExamList(sessionOid);
    }
  }

  addExam(oid: string) {
    this._router.navigate(['/school/exam/add']);
  }

  editExamInfo(oid: string) {
    this._router.navigate(['/school/exam/edit/' + oid]);
  }

  viewExamInfo(oid: string) {
    this._router.navigate(['/school/exam/view/' + oid]);
  }



  private createFilter(): (examList: ExamList, filter: string) => boolean {
    let filterFunction = function (examList, filter): boolean {
      return examList.nameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || examList.nameBn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || examList.startDate.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || examList.endDate.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || examList.status.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }

    return filterFunction;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
    // setTimeout(() => this.setActiveLanguageLink());
  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
