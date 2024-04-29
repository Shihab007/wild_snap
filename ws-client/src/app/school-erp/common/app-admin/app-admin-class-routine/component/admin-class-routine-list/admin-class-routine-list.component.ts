import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ClassRoutineList } from 'src/app/school-erp/common/shared/model/class-routine/class-routine-list';
import { ClassRoutineListRequest } from 'src/app/school-erp/common/shared/request/class-routine/class-routine-list-request';
import { ClassRoutineListRequestBody } from 'src/app/school-erp/common/shared/request/class-routine/class-routine-list-request-body';
import { ClassRoutineListResponseBody } from 'src/app/school-erp/common/shared/response/class-routine/class-routine-list-response-body';
import { ClassRoutineService } from 'src/app/school-erp/common/shared/services/class-routine/class-routine.service';

@Component({
  selector: 'app-admin-class-routine-list',
  templateUrl: './admin-class-routine-list.component.html',
  styleUrls: ['./admin-class-routine-list.component.scss']
})
export class AdminClassRoutineListComponent implements OnInit {

  public classFilter = new FormControl('');
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  public requesHeader: RequestHeader = new RequestHeader();
  public classRoutineListRequest: ClassRoutineListRequest = new ClassRoutineListRequest();
  public classRoutineListRequestBody: ClassRoutineListRequestBody = new ClassRoutineListRequestBody();
  public classRoutineListResponseBody: ClassRoutineListResponseBody = new ClassRoutineListResponseBody();

  dataSource = new MatTableDataSource<ClassRoutineList>();
  selection = new SelectionModel<ClassRoutineList>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'instituteShiftNameEn', 'classNameEn', 'instituteVersionNameEn', 'instituteClassSectionNameEn', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];

  constructor(
    private _classRoutineService: ClassRoutineService,
    private router: Router,
    private _appStorageService: AppStorageService,
    private translate: TranslateService,
  ) { }

  goToClassRoutineEntryPage() {
    var routerPath = 'school/class-routine/add';
    this.router.navigate([routerPath]);
  }

  goToClassRoutineViewPage(obj: any) {
    var routerPath = 'school/class-routine/view/';
    var oid = obj.oid;
    debugger;
    this.router.navigate([routerPath, oid]);
  }

  goToClassRoutineEditPage(obj: any) {
    var routerPath = 'school/class-routine/edit/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }


  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    });
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.getClassRoutineList();
  }


  getClassRoutineList() {
    this.requesHeader.requestId = this.header.requestId;
    this.requesHeader.requestDateTime = this.header.requestDateTime;
    this.requesHeader.requestSource = this.header.requestSource;
    this.requesHeader.requestServiceSource = this.header.requestServiceSource;

    this.classRoutineListRequest.header = this.requesHeader;
    this.classRoutineListRequest.body = this.classRoutineListRequestBody;
    // this.classRoutineListRequest.body.instituteOid = this.userInfo.instituteOid;

    this._classRoutineService.getClassRoutineList(this.classRoutineListRequest).subscribe(data => {
      console.log(data);
      console.log(data.body.classRoutineList);
      if (data.header.responseCode == "200") {
        this.dataSource.data = data.body.classRoutineList;
      }
    });
  }

  routineDetail(sectionId) {
    this.router.navigate(['school-admin-dashboard/get-class-routine/', sectionId]);
  }


  private createFilter(): (classRoutineList: ClassRoutineList, filter: string) => boolean {
    let filterFunction = function (classRoutineList, filter): boolean {
      return classRoutineList.classNameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        classRoutineList.instituteShiftNameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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
