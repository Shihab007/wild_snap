import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ResponseHeader } from 'src/app/school-erp/common/shared/header/response-header';
import { EducationGradingSystemList } from 'src/app/school-erp/common/shared/model/education/education-grading-system-list';
import { EducationGradingSystemListRequest } from 'src/app/school-erp/common/shared/request/education/education-grading-system-list-request';
import { EducationGradingSystemListRequestBody } from 'src/app/school-erp/common/shared/request/education/education-grading-system-list-request-body';
import { EducationGradingSystemListResponse } from 'src/app/school-erp/common/shared/response/education/education-grading-system-list-response';
import { EducationGradingSystemListResponseBody } from 'src/app/school-erp/common/shared/response/education/education-grading-system-list-response-body';
import { EducationGradingSystemService } from 'src/app/school-erp/common/shared/services/education/education-grading-system.service';
import { TranslateService } from "@ngx-translate/core";
import { GradingSystemService } from 'src/app/school-erp/common/shared/services/grading-system/grading-system.service';


@Component({
  selector: 'app-admin-education-grading-system-list',
  templateUrl: './admin-education-grading-system-list.component.html',
  styleUrls: ['./admin-education-grading-system-list.component.scss']
})
export class AdminEducationGradingSystemListComponent implements OnInit {
  public local: any;


  constructor(
    private _gradingSystemService: GradingSystemService,
    private _dialog: MatDialog,
    private _translate: TranslateService

  ) { }

  ngOnInit(): void {
    this.getEducationGradingSystemList()
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.local = "en";
      } else {
        this.local = "bn";
      }
    });
  }

  header: Header = new Header();

  request: EducationGradingSystemListRequest = new EducationGradingSystemListRequest;
  requestHeader: RequestHeader = new RequestHeader;
  requestBody: EducationGradingSystemListRequestBody = new EducationGradingSystemListRequestBody;
  response: EducationGradingSystemListResponse = new EducationGradingSystemListResponse;
  responseHeader: ResponseHeader = new ResponseHeader;
  responseBody: EducationGradingSystemListResponseBody = new EducationGradingSystemListResponseBody;
  classFilter: any;

  dataSource = new MatTableDataSource<EducationGradingSystemList>();
  selection = new SelectionModel<EducationGradingSystemList>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNo', 'nameEn', 'gradePointScale', 'educationTypeNameEn', 'educationSystemNameEn', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];

  list: EducationGradingSystemList[];


  getEducationGradingSystemList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.request.header = this.requestHeader;
    this.request.body = this.requestBody;

    this._gradingSystemService.educationGradingSystemList(this.request).subscribe(data => {
      console.log('Education Grading System List')
      this.dataSource.data = data.body.educationGradingSystemList;
      console.log(data.body.educationGradingSystemList)

    });
  }

}
