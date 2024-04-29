import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ResponseHeader } from 'src/app/school-erp/common/shared/header/response-header';
import { EducationBoardListRequest } from 'src/app/school-erp/common/shared/request/education/education-board-list-request';
import { EducationBoardService } from 'src/app/school-erp/common/shared/services/education/education-board.service';
import { EducationBoardListRequestBody } from 'src/app/school-erp/common/shared/request/education/education-board-list-request-body';
import { EducationBoardListResponseBody } from 'src/app/school-erp/common/shared/response/education/education-board-list-response-body';
import { EducationBoardListResponse } from 'src/app/school-erp/common/shared/response/education/education-board-list-response';
import { EducationBoardList } from 'src/app/school-erp/common/shared/model/education/education-board-list';


@Component({
  selector: 'app-admin-education-board-list',
  templateUrl: './admin-education-board-list.component.html',
  styleUrls: ['./admin-education-board-list.component.scss']
})
export class AdminEducationBoardListComponent implements OnInit {
  public local: any;


  constructor(
    private educationBoardService: EducationBoardService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getEducationBoardList()
  }

  header: Header = new Header();

  request: EducationBoardListRequest = new EducationBoardListRequest;
  requestHeader: RequestHeader = new RequestHeader;
  requestBody: EducationBoardListRequestBody = new EducationBoardListRequestBody;
  response: EducationBoardListResponse = new EducationBoardListResponse;
  responseHeader: ResponseHeader = new ResponseHeader;
  responseBody: EducationBoardListResponseBody = new EducationBoardListResponseBody;
  classFilter: any;

  dataSource = new MatTableDataSource<EducationBoardList>();
  selection = new SelectionModel<EducationBoardList>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNo', 'nameEn', 'shortName', 'EducationSystemNameEn', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];

  educationBoardList: EducationBoardList[];


  getEducationBoardList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.request.header = this.requestHeader;
    this.request.body = this.requestBody;

    this.educationBoardService.getEducationBoardList(this.request).subscribe(data => {
      this.dataSource.data = data.body.educationBoardList;
    });
  }

}
