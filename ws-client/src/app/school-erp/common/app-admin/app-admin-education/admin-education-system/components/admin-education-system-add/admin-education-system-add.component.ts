import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { Location } from '@angular/common';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { EducationSession } from 'src/app/school-erp/common/shared/model/education/education-session';
import { EducationMediumListRequest } from 'src/app/school-erp/common/shared/request/education-medium/education-medium-list-request';
import { EducationMediumListRequestBody } from 'src/app/school-erp/common/shared/request/education-medium/education-medium-list-request-body';
import { CuntryService } from 'src/app/school-erp/common/shared/services/education/cuntry.service';
import { EducationMedium } from 'src/app/school-erp/common/shared/model/education-medium/education-medium';
import { EducationSystemService } from 'src/app/school-erp/common/shared/services/education/education-system.service';
import { AdminEducationCurriculumListRequest } from 'src/app/school-erp/common/shared/request/curriculum/admin-education-curriculum-list-request';
import { AdminEducationCurriculumListRequestBody } from 'src/app/school-erp/common/shared/request/curriculum/admin-education-curriculum-list-request-body';
import { AdminEducationCurriculumList } from 'src/app/school-erp/common/shared/model/curriculum/admin-education-curriculum-list';
import { AdminEducationSystemCreateRequest } from 'src/app/school-erp/common/shared/request/education-system/admin-education-system-create-request';
import { AdminEducationSystemCreateRequestBody } from 'src/app/school-erp/common/shared/request/education-system/admin-education-system-create-request-body';
import { BANGLA_REGEX, NAME_REGEX } from 'src/app/common/constant/reg-constant';

@Component({
  selector: 'app-admin-education-system-add',
  templateUrl: './admin-education-system-add.component.html',
  styleUrls: ['./admin-education-system-add.component.scss']
})
export class AdminEducationSystemAddComponent implements OnInit {

  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();

  // public districtList: DistrictList[];

  public runningEducationSessionList: EducationSession[];

  constructor(
    private educationService: EducationService,
    private educationSystemService: EducationSystemService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private appStorageService: AppStorageService,
    private router: Router,
    private _location: Location,
  ) { }

  @ViewChild('nameEn') nameEn: any;
  @ViewChild('shortName') shortName: any;


  public requestHeader: RequestHeader = new RequestHeader();

  public nameEnPattern = NAME_REGEX;
  public nameBnPattern = BANGLA_REGEX;

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
    this.getEducationMediumList();
  }


  public educationMediumListRequest: EducationMediumListRequest = new EducationMediumListRequest();
  public educationMediumListRequestBody: EducationMediumListRequestBody = new EducationMediumListRequestBody();
  educationMedium: EducationMedium[] = [];

  getEducationMediumList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.educationMediumListRequest.header = this.requestHeader;
    this.educationMediumListRequest.body = this.educationMediumListRequestBody;

    this.educationService.getEducationMedium(this.educationMediumListRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.educationMedium = response.body.list;
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message);
      })
  }

  public adminEducationCurriculumListRequest: AdminEducationCurriculumListRequest = new AdminEducationCurriculumListRequest;
  public adminEducationCurriculumListRequestBody: AdminEducationCurriculumListRequestBody = new AdminEducationCurriculumListRequestBody();
  educationCurriculumList: AdminEducationCurriculumList[] = [];
  educationMediumOid: string;
  getEducationCurriculumList(educationMediumOid: string) {
    this.educationMediumOid = educationMediumOid;

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.adminEducationCurriculumListRequest.header = this.requestHeader;
    this.adminEducationCurriculumListRequestBody.educationMediumOid = educationMediumOid;
    this.adminEducationCurriculumListRequest.body = this.adminEducationCurriculumListRequestBody;

    this.educationService.getEducationCurriculumList(this.adminEducationCurriculumListRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this.educationCurriculumList = data.body.list;
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message)
      });
  }


  isValidData() {
    if (!this.systemBody.nameEn.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Name in English');
      this.nameEn.nativeElement.focus();
      return false;
    }
    if (!this.systemBody.shortName.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Name in Short Name');
      this.shortName.nativeElement.focus();
      return false;
    }

    return true;
  }



  public adminEducationSystemCreateRequest: AdminEducationSystemCreateRequest = new AdminEducationSystemCreateRequest();
  public systemBody: AdminEducationSystemCreateRequestBody = new AdminEducationSystemCreateRequestBody();

  addEducationSystem() {
    if (this.educationMediumOid == null) {
      this.toastr.error("Please Select Education Medium");
      return 0;
    }
    if (this.systemBody.nameEn == null) {
      this.toastr.error("Please Enter Name in English");
      return 0;
    }
    if (this.systemBody.nameBn == null) {
      this.toastr.error("Please Enter Name in Bangla");
      return 0;
    }
    if (this.systemBody.shortName == null) {
      this.toastr.error("Please Enter Curriculum Short Name");
      return 0;
    }
    if (this.systemBody.curriculumOid == null) {
      this.toastr.error("Please Select Curriculum");
      return 0;
    }
    if (this.systemBody.status == null) {
      this.toastr.error("Please Select Status");
      return 0;
    }
    if (!this.isValidData()) {
      return;
    }

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.adminEducationSystemCreateRequest.header = this.requestHeader;
    this.adminEducationSystemCreateRequest.body = this.systemBody;

    this.educationSystemService.createEducationSystem(this.adminEducationSystemCreateRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.toastr.success("Education System is saved successfully");
        this.router.navigate(['admin/education/system/list']);
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

}



