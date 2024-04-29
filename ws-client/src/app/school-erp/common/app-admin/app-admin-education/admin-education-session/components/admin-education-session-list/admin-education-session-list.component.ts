import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/login/shared/model/keycloak-user-info/Header/request-header';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { DEFAULT_LANG, USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';
import { GetEducationSessionListRequest } from 'src/app/school-erp/common/shared/request/education/get-education-session-list-request';
import { GetEducationSessionListRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-session-list-request-body';
import { EducationSessionService } from 'src/app/school-erp/common/shared/services/education/education-session.service';
import { EducationSession } from 'src/app/school-erp/common/shared/model/education/education-session';



@Component({
  selector: 'app-admin-education-session-list',
  templateUrl: './admin-education-session-list.component.html',
  styleUrls: ['./admin-education-session-list.component.scss']
})
export class AdminEducationSessionListComponent implements OnInit {


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  public educationSessionList: EducationSession[];
  header: Header = new Header();
  requestHeader: RequestHeader = new RequestHeader();
  dataSource = new MatTableDataSource<EducationSession>();

  displayedColumns: string[] = ['serialNumber', 'subjectName', 'subjectCode', 'subjectType',
    'curriculumName', 'mediumName', 'status', 'actions'];

  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  param1: any;
  param2: any;

  constructor(
    private _educationService: EducationService,
    private _educationSessionService: EducationSessionService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private _appStorageService: AppStorageService,
  ) { }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;

    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });

    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.getEducationSessionList();
  }



  getEducationSessionListRequest: GetEducationSessionListRequest = new GetEducationSessionListRequest();
  getEducationSessionListRequestBody: GetEducationSessionListRequestBody = new GetEducationSessionListRequestBody();
  getEducationSessionList() {
    this.getEducationSessionListRequest.body = this.getEducationSessionListRequestBody;
    this._educationSessionService.educationSessionList(this.getEducationSessionListRequest).subscribe(data => {
      this.dataSource.data = data.body.educationSessionList;
      this.educationSessionList = data.body.educationSessionList;
    })
  }

  private createFilter(): (educationSessionList: EducationSession, filter: string) => boolean {
    let filterFunction = function (educationSessionList, filter): boolean {
      return educationSessionList.nameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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

  goToAddEducationSession() {
    var routerPath = 'admin/education/session/add';
    this.router.navigate([routerPath]);
  }
  viewSessionInfo(oid: string) {
    var routerPath = 'admin/education/session/view/';
    this.router.navigate([routerPath + oid]);
  }
  editSessionInfo(oid: string) {
    var routerPath = 'admin/education/session/edit/';
    this.router.navigate([routerPath + oid]);
  }
  cloneSessionInfo(oid: string) {
    var routerPath = 'admin/education/session/clone/';
    this.router.navigate([routerPath + oid]);
  }
  configureSessionInfo(oid: string) {
    var routerPath = 'admin/education/session/configure/';
    this.router.navigate([routerPath + oid]);
  }
}
