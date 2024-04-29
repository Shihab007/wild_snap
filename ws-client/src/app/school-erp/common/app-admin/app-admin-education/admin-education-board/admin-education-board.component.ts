import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EducationSystemService } from 'src/app/school-erp/common/shared/services/education/education-system.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { EducationSystemList } from 'src/app/school-erp/common/shared/model/education/education-system-list';
import { EducationSystemListRequest } from 'src/app/school-erp/common/shared/request/education/education-system-list-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { EducationSystemListRequestBody } from 'src/app/school-erp/common/shared/request/education/education-system-list-request-body';
import { EducationSystemListResponse } from 'src/app/school-erp/common/shared/response/education/education-system-list-response';
import { ResponseHeader } from 'src/app/school-erp/common/shared/header/response-header';
import { EducationSystemListResponseBody } from 'src/app/school-erp/common/shared/response/education/education-system-list-response-body';
import { EducationBoardService } from '../../../shared/services/education/education-board.service';
import { EducationBoardListRequest } from '../../../shared/request/education/education-board-list-request';
import { EducationBoardListRequestBody } from '../../../shared/request/education/education-board-list-request-body';
import { EducationBoardListResponse } from '../../../shared/response/education/education-board-list-response';
import { EducationBoardListResponseBody } from '../../../shared/response/education/education-board-list-response-body';

@Component({
  selector: 'app-admin-education-board',
  templateUrl: './admin-education-board.component.html',
  styleUrls: ['./admin-education-board.component.scss']
})
export class AdminEducationBoardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

 


}
