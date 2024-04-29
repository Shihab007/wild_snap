import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { RequestHeader } from 'src/app/login/shared/model/keycloak-user-info/Header/request-header';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { GuardianList } from 'src/app/school-erp/common/shared/model/guardian/guardian-list';
import { GuardianListRequest } from 'src/app/school-erp/common/shared/request/guardian/guardian-list-request';
import { GuardianListRequestBody } from 'src/app/school-erp/common/shared/request/guardian/guardian-list-request-body';
import { InstituteGuardianListRequest } from 'src/app/school-erp/common/shared/request/guardian/institute-guardian-list-request';
import { InstituteGuardianListRequestBody } from 'src/app/school-erp/common/shared/request/guardian/institute-guardian-list-request-body';
import { AppGuardianService } from 'src/app/school-erp/common/shared/services/guardian/app-guardian-service';


@Component({
  selector: 'app-admin-guardian-list',
  templateUrl: './admin-guardian-list.component.html',
  styleUrls: ['./admin-guardian-list.component.scss']
})
export class AdminGuardianListComponent implements OnInit {
  public header: Header = new Header();
  public locale: any;

  public requestHeader: RequestHeader = new RequestHeader();
  public userInfo: UserInfo = new UserInfo();
  public guardianListRequest: GuardianListRequest = new GuardianListRequest();
  public guardianListBody: GuardianListRequestBody = new GuardianListRequestBody();
  public dataSource = new MatTableDataSource<GuardianList>();
  public selection = new SelectionModel<GuardianList>(true, []);

  public displayedColumns: string[] = ['serialNumber', 'photoUrl', 'guardianName', 'phoneNumber', 'email', 'educationalQualification', 'gender', 'actions'];
  public pipe: DatePipe;
  public msgs: Message[] = [];
  public param: any;
  public classFilter = new FormControl('');
  public requisitionSubscription: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private guardianListService: AppGuardianService,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService,
    private _appStorageService: AppStorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    });
    this.getInstituteGuardianList();
  }

  goToGuardianEntryPage() {
    var routerPath = 'school/guardian/add';
    this.router.navigate([routerPath]);
  }


  public instituteguardianListRequest: InstituteGuardianListRequest = new InstituteGuardianListRequest();
  public instituteguardianListBody: InstituteGuardianListRequestBody = new InstituteGuardianListRequestBody();

  getInstituteGuardianList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.instituteguardianListRequest.header = this.requestHeader;
    this.instituteguardianListRequest.body = this.instituteguardianListBody;
    // this.instituteguardianListRequest.body.instituteOid = this.userInfo.instituteOid;

    this.guardianListService.getInstituteGuardianList(this.instituteguardianListRequest).subscribe(data => {
      this.dataSource.data = data.body.guardianList;
      console.log('guardian list');
      console.log(this.dataSource.data);


    });
  }

  editGuardianInfo(obj: any) {
    var routerPath = 'school/guardian/edit/';
    var oid = obj.oid;

    this.router.navigate([routerPath, oid]);
    this.toastr.success('Guardian Edit Form loaded successfully');
  }

  viewGuardianInfo(obj: any) {
    var routerPath = 'school/guardian/view/';
    var oid = obj.oid;

    this.router.navigate([routerPath, oid]);
    this.toastr.success('Guardian information loaded successfully');
  }

  private createFilter(): (guardianList: GuardianList, filter: string) => boolean {
    let filterFunction = function (guardianList, filter): boolean {
      return guardianList.nameEnglish.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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
