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
import { AdminEducationCurriculumCreateRequest } from 'src/app/school-erp/common/shared/request/curriculum/admin-education-curriculum-create-request';
import { AdminEducationCurriculumCreateRequestBody } from 'src/app/school-erp/common/shared/request/curriculum/admin-education-curriculum-create-request-body';
import { CountryListRequest } from 'src/app/school-erp/common/shared/request/country/country-list-request';
import { CountryListRequestBody } from 'src/app/school-erp/common/shared/request/country/country-list-request-body';
import { Country } from 'src/app/school-erp/common/shared/model/country/country';
import { EducationMedium } from 'src/app/school-erp/common/shared/model/education-medium/education-medium';
import { BANGLA_REGEX, NAME_REGEX } from 'src/app/common/constant/reg-constant';

@Component({
  selector: 'app-admin-education-curriculum-create',
  templateUrl: './admin-education-curriculum-create.component.html',
  styleUrls: ['./admin-education-curriculum-create.component.scss']
})
export class AdminEducationCurriculumCreateComponent implements OnInit {

  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();

  public nameEnPattern = NAME_REGEX;
  public nameBnPattern = BANGLA_REGEX;

  @ViewChild('nameEn') nameEn: any;
  @ViewChild('shortName') shortName: any;

  public runningEducationSessionList: EducationSession[];

  constructor(
    private educationService: EducationService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private appStorageService: AppStorageService,
    private router: Router,
    private cuntryService: CuntryService,
    private _location: Location,
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
    this.getEducationMediumList();
    this.getCountryList();
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

  public countryListRequest: CountryListRequest = new CountryListRequest();
  public countryListRequestBody: CountryListRequestBody = new CountryListRequestBody();
  countryList: Country[] = [];

  getCountryList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.countryListRequest.header = this.requestHeader;
    this.countryListRequest.body = this.countryListRequestBody;

    this.cuntryService.getCountryList(this.countryListRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.countryList = response.body.countryList;
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message);
      })
  }

  isValidData() {
    if (!this.curriculumBody.nameEn.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Name in English');
      this.nameEn.nativeElement.focus();
      return false;
    }
    if (!this.curriculumBody.shortName.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Name in Short Name');
      this.shortName.nativeElement.focus();
      return false;
    }

    return true;
  }

  public adminEducationCurriculumCreateRequest: AdminEducationCurriculumCreateRequest = new AdminEducationCurriculumCreateRequest();
  public curriculumBody: AdminEducationCurriculumCreateRequestBody = new AdminEducationCurriculumCreateRequestBody();

  addEducationCurriculum() {

    if (this.curriculumBody.nameEn == null) {
      this.toastr.error("Please Enter Curriculum Name in English");
      return 0;
    }
    if (this.curriculumBody.nameBn == null) {
      this.toastr.error("Please Enter Curriculum Name in Bangla");
      return 0;
    }
    if (this.curriculumBody.shortName == null) {
      this.toastr.error("Please Enter Curriculum Short Name");
      return 0;
    }
    if (this.curriculumBody.website == null) {
      this.toastr.error("Please Enter Curriculum Website Link");
      return 0;
    }
    if (this.curriculumBody.educationMediumOid == null) {
      this.toastr.error("Please Select Education Medium");
      return 0;
    }
    if (this.curriculumBody.countryOid == null) {
      this.toastr.error("Please Select Country");
      return 0;
    }
    if (this.curriculumBody.status == null) {
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

    this.adminEducationCurriculumCreateRequest.header = this.requestHeader;
    this.adminEducationCurriculumCreateRequest.body = this.curriculumBody;

    this.educationService.createEducationCurriculum(this.adminEducationCurriculumCreateRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.toastr.success("Education Curriculum is saved successfully");
        this.router.navigate(['admin/education/curriculum/list']);
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



