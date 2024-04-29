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
import { EducationTypeList } from 'src/app/school-erp/common/shared/model/education/education-type-list';
import { EducationTypeListRequest } from 'src/app/school-erp/common/shared/request/education/education-type-list-request';
import { EducationTypeListRequestBody } from 'src/app/school-erp/common/shared/request/education/education-type-list-request-body';
import { EducationTypeListResponse } from 'src/app/school-erp/common/shared/response/education/education-type-list-response';
import { EducationTypeListResponseBody } from 'src/app/school-erp/common/shared/response/education/education-type-list-respponse-body';
import { EducationTypeService } from 'src/app/school-erp/common/shared/services/education/education-type.service';
import { TranslateService } from "@ngx-translate/core";
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';


@Component({
  selector: 'app-admin-education-type-list',
  templateUrl: './admin-education-type-list.component.html',
  styleUrls: ['./admin-education-type-list.component.scss']
})
export class AdminEducationTypeListComponent implements OnInit {
  public local: any;
  public userInfo: UserInfo = new UserInfo();
  public locale: any;


  constructor(
    private educationTypeService: EducationTypeService,
    private _appStorageService: AppStorageService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    });

    this.getEducationTypeList()
  }

  header: Header = new Header();

  request: EducationTypeListRequest = new EducationTypeListRequest;
  requestHeader: RequestHeader = new RequestHeader;
  requestBody: EducationTypeListRequestBody = new EducationTypeListRequestBody;
  response: EducationTypeListResponse = new EducationTypeListResponse;
  responseHeader: ResponseHeader = new ResponseHeader;
  responseBody: EducationTypeListResponseBody = new EducationTypeListResponseBody;
  classFilter: any;

  dataSource = new MatTableDataSource<EducationTypeList>();
  selection = new SelectionModel<EducationTypeList>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNo', 'nameEn', 'shortName', 'educationSystemNameEn', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];

  list: EducationTypeList[];


  getEducationTypeList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.request.header = this.requestHeader;
    this.request.body = this.requestBody;

    this.educationTypeService.educationTypeList(this.request).subscribe(data => {
      this.dataSource.data = data.body.list;
    });
  }

  private createFilter(): (educationTypeList: EducationTypeList, filter: string) => boolean {
    let filterFunction = function (educationTypeList, filter): boolean {
      return educationTypeList.nameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || (educationTypeList.shortName != null ? educationTypeList.shortName.toLowerCase().indexOf(filter.toLowerCase()) !== -1 : false);
    }
    return filterFunction;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
