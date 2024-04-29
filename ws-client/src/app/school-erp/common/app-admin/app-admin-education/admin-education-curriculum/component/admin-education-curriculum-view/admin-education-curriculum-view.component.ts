import { SelectionModel } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { AdminEducationCurriculumViewRequest } from 'src/app/school-erp/common/shared/request/curriculum/admin-education-curriculum-view-request';
import { AdminEducationCurriculumViewRequestBody } from 'src/app/school-erp/common/shared/request/curriculum/admin-education-curriculum-view-request-body';
import { AdminEducationCurriculumViewResponseBody, EducationSystem } from 'src/app/school-erp/common/shared/response/curriculum/admin-education-curriculum-view-response-body';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';

@Component({
  selector: 'app-admin-education-curriculum-view',
  templateUrl: './admin-education-curriculum-view.component.html',
  styleUrls: ['./admin-education-curriculum-view.component.scss']
})
export class AdminEducationCurriculumViewComponent implements OnInit {

  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();


  dataSource = new MatTableDataSource<EducationSystem>();
  selection = new SelectionModel<EducationSystem>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNo', 'name', 'shortName', 'numberOfInstitute', 'status'];


  constructor(
    private educationService: EducationService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private appStorageService: AppStorageService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
  ) { }

  public requestHeader: RequestHeader = new RequestHeader();

  ngOnInit(): void {
    this.local = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });
    this.userInfo = JSON.parse(this.appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));

    this.getEducationCurriculum();
  }



  public adminEducationCurriculumViewRequest: AdminEducationCurriculumViewRequest = new AdminEducationCurriculumViewRequest();
  public adminEducationCurriculumViewRequestBody: AdminEducationCurriculumViewRequestBody = new AdminEducationCurriculumViewRequestBody();
  public adminEducationCurriculum: AdminEducationCurriculumViewResponseBody = new AdminEducationCurriculumViewResponseBody();


  getEducationCurriculum() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.adminEducationCurriculumViewRequest.header = this.requestHeader;

    this.adminEducationCurriculumViewRequestBody.oid = this.route.snapshot.params["oid"];

    this.adminEducationCurriculumViewRequest.body = this.adminEducationCurriculumViewRequestBody;

    this.educationService.getEducationCurriculum(this.adminEducationCurriculumViewRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.adminEducationCurriculum = response.body;
        this.dataSource.data = response.body.educationSystems;
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message);
      })
  }

  goBack() {
    this._location.back();
  }


  goToEditEducationCurriculumn() {
    var routerPath = 'admin/education/curriculum/edit/';
    this.router.navigate([routerPath + this.adminEducationCurriculum.oid]);
  }

}
