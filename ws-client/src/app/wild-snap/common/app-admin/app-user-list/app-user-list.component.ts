
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from "src/app/login/auth/app-storage.service";
import { UserInfo } from "src/app/login/shared/model/user-info";
import { USER_INFO_LOCAL_STORAGE_KEY } from "src/app/common/constant/constant";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstantService } from 'src/app/common/services/constant.service';
import { UserRole } from '../../shared/model/user/user-role';
import { RequestHeader } from '../../shared/header/request-header';
import { UserRoleListService } from '../../shared/services/user/user-role-list.service';
import { UserRoleListRequest } from '../../shared/request/user/user-role-list-request';
import { UserRoleListRequestBody } from '../../shared/request/user/user-role-list-request-body';
@Component({
  selector: 'app-app-user-list',
  templateUrl: './app-user-list.component.html',
  styleUrls: ['./app-user-list.component.scss']
})
export class AppUserListComponent implements OnInit {

  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();

  public classFilter = new FormControl('');

  dataSource = new MatTableDataSource<UserRole>();
  selection = new SelectionModel<UserRole>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'name', 'mobileNo', 'email', 'status'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];

  public requestHeader: RequestHeader = new RequestHeader;

  public userRoleList: UserRole[] = [];
  constructor(
    private translate: TranslateService,
    private _appStorageService: AppStorageService,
    private userRoleListService: UserRoleListService,
    private _toastr: ToastrService,
    private router: Router,
    private _spinner: NgxSpinnerService,
    private constantService: ConstantService
  ) { }


  ngOnInit(): void {
    this.userInfo = JSON.parse(
      this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY)
    );

    this.local = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });
    this.getUserList();
  }


  getUserRoleListRequest: UserRoleListRequest = new UserRoleListRequest();
  getUserRoleListRequestbody: UserRoleListRequestBody = new UserRoleListRequestBody();
  getUserList() {
    this.getUserRoleListRequest.header = this.header;
    this.getUserRoleListRequest.body = this.getUserRoleListRequestbody;

    this.userRoleListService.getUserRoleList(this.getUserRoleListRequest).subscribe(data => {
      if (data.header.responseCode == '200') {
        this.userRoleList = data.body.userList;
        this.dataSource.data = data.body.userList;
        this._toastr.success("Successfully Users Loaded");
      } else {
        this._toastr.error('Failed to get User Role list');
      }

    });
  }

  private createFilter(): (userRoleList: UserRole, filter: string) => boolean {
    let filterFunction = function (userRoleList, filter): boolean {
      return userRoleList.nameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || userRoleList.mobileNo.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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
