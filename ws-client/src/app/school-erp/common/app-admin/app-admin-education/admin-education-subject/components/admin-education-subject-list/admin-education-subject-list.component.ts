import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { EducationSubjectService } from 'src/app/school-erp/common/shared/services/education/education-subject.service';
import { EducationSubjectListRequest } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-list-request';
import { EducationSubjectListRequestBody } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-list-request-body';
import { EducationSubjectList } from 'src/app/school-erp/common/shared/model/education-subject/education-subject-list';
import { SharedDataService } from 'src/app/school-erp/common/shared/model/education-subject/educaiton-subject-data-store';


@Component({
  selector: 'app-admin-education-subject-list',
  templateUrl: './admin-education-subject-list.component.html',
  styleUrls: ['./admin-education-subject-list.component.scss']
})
export class AdminEducationSubjectListComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  public EducationSubjectList: EducationSubjectList[];

  header: Header = new Header();

  requestHeader: RequestHeader = new RequestHeader();
  dataSource = new MatTableDataSource<EducationSubjectList>();
  selection = new SelectionModel<EducationSubjectList>(true, []);

  displayedColumns: string[] = ['serialNumber', 'subjectName', 'subjectCode', 'subjectType',
    'educationSystemName', 'educationCurriculumName', 'status', 'actions'];

  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  param1: any;
  param2: any;

  constructor(
    private educationSubjectService: EducationSubjectService,
    private router: Router,
    private translate: TranslateService,
    private _appStorageService: AppStorageService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });

    this.getEducaitonSubjectList();
  }

  educationSubjectListRequest: EducationSubjectListRequest = new EducationSubjectListRequest();
  educationSubjectListRequestBody: EducationSubjectListRequestBody = new EducationSubjectListRequestBody();


  getEducaitonSubjectList() {
    this.educationSubjectListRequest.header = this.header;
    this.educationSubjectListRequest.body = this.educationSubjectListRequestBody;

    this.educationSubjectService.getEducationSubjectList(this.educationSubjectListRequest).subscribe(data => {
      this.dataSource.data = data.body.educationSubjectList;
    });
  }

  private createFilter(): (instituteSubjectList: EducationSubjectList, filter: string) => boolean {
    let filterFunction = function (instituteSubjectList, filter): boolean {
      return instituteSubjectList.nameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || (instituteSubjectList.subjectCode != null ? instituteSubjectList.subjectCode.toLowerCase().indexOf(filter.toLowerCase()) !== -1 : false);
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

  goToAddEducationSubject() {
    var routerPath = 'admin/education/subject/add';
    this.router.navigate([routerPath]);
  }

  editEducationSubjectInfo(obj: any) {
    var routerPath = 'admin/education/subject/edit/';
    let items = [{ oid: obj.oid, educationCurriculumOid: obj.educationCurriculumOid, educationSessionOid: obj.educationSessionOid }];
    this.sharedDataService.setData(items);
    this.router.navigate([routerPath]);
  }

  viewEducationSubjectInfo(obj: any) {
    var routerPath = 'admin/education/subject/view/';
    let items = [{ oid: obj.oid, educationCurriculumOid: obj.educationCurriculumOid, educationSessionOid: obj.educationSessionOid }];
    this.sharedDataService.setData(items);
    this.router.navigate([routerPath]);
  }
}
