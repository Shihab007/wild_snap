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
import { AdminEducationSystemViewRequest } from 'src/app/school-erp/common/shared/request/education-system/admin-education-system-view-request';
import { AdminEducationSystemViewRequestBody } from 'src/app/school-erp/common/shared/request/education-system/admin-education-system-view-request-body';
import { AdminEducationCurriculumViewResponseBody, EducationSystem } from 'src/app/school-erp/common/shared/response/curriculum/admin-education-curriculum-view-response-body';
import { AdminEducationSystemViewResponseBody } from 'src/app/school-erp/common/shared/response/education-system/admin-education-system-view-response-body';
import { EducationSystemService } from 'src/app/school-erp/common/shared/services/education/education-system.service';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';

@Component({
  selector: 'app-admin-education-system-view',
  templateUrl: './admin-education-system-view.component.html',
  styleUrls: ['./admin-education-system-view.component.scss']
})
export class AdminEducationSystemViewComponent implements OnInit {
  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();

  constructor(
    private translate: TranslateService,
    private toastr: ToastrService,
    private appStorageService: AppStorageService,
    private route: ActivatedRoute,
    private _location: Location,
    private educationSystemService: EducationSystemService,
    private router: Router

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

    this.getEducationSystemByOid();
  }


  public adminEducationSystemViewRequest: AdminEducationSystemViewRequest = new AdminEducationSystemViewRequest();
  public adminEducationSystemViewRequestBody: AdminEducationSystemViewRequestBody = new AdminEducationSystemViewRequestBody();
  public responseBody: AdminEducationSystemViewResponseBody = new AdminEducationSystemViewResponseBody();


  getEducationSystemByOid() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.adminEducationSystemViewRequest.header = this.requestHeader;
    this.adminEducationSystemViewRequestBody.oid = this.route.snapshot.params["oid"];
    this.adminEducationSystemViewRequest.body = this.adminEducationSystemViewRequestBody;

    this.educationSystemService.getEducationSystemByOid(this.adminEducationSystemViewRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.responseBody = response.body;
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

  goToEditEducationSystem() {
    var routerPath = 'admin/education/system/edit/';
    this.router.navigate([routerPath + this.route.snapshot.params["oid"]]);
  }

}
