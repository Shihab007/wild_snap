import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Header } from 'src/app/common/request/base-request';
import { ConstantService } from 'src/app/common/services/constant.service';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { SharedDataService } from 'src/app/school-erp/common/shared/model/education-subject/educaiton-subject-data-store';
import { NgxSpinnerConfiguration } from 'src/app/school-erp/common/shared/model/ngx-spinner-configuration';
import { AssetByOidRequest } from 'src/app/school-erp/common/shared/request/asset/asset-by-oid-request';
import { AssetByOidRequestBody } from 'src/app/school-erp/common/shared/request/asset/asset-by-oid-request-body';
import { EducationSubjectViewRequest } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-view-request';
import { EducationSubjectViewRequestBody } from 'src/app/school-erp/common/shared/request/education-subject/education-subject-view-request-body';
import { AssetByOidResponseBody } from 'src/app/school-erp/common/shared/response/asset/asset-by-oid-response-body';
import { EducationSubjectViewResponseBody } from 'src/app/school-erp/common/shared/response/education-subject/education-subject-view-response-body';
import { EducationSubjectService } from 'src/app/school-erp/common/shared/services/education/education-subject.service';

@Component({
  selector: 'app-admin-education-subject-view',
  templateUrl: './admin-education-subject-view.component.html',
  styleUrls: ['./admin-education-subject-view.component.scss']
})
export class AdminEducationSubjectViewComponent implements OnInit {

  public spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();

  constructor(
    private _translate: TranslateService,
    private _router: Router,
    private _location: Location,
    private _constantService: ConstantService,
    private educationSubjectService: EducationSubjectService,
    private sharedDataService: SharedDataService,
  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }

  educationSubjectOids: any;
  public locale: any;
  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();

  public asset: AssetByOidResponseBody = new AssetByOidResponseBody();
  public assetByOidRequest: AssetByOidRequest = new AssetByOidRequest();
  public assetByOidRequestBody: AssetByOidRequestBody = new AssetByOidRequestBody();



  ngOnInit(): void {
    this.locale = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });

    this.sharedDataService.data$.subscribe((data) => {
      this.educationSubjectOids = data[0];
    });

    this.getEducationSubject();
  }

  public educationSubjectViewRequest: EducationSubjectViewRequest = new EducationSubjectViewRequest();
  public educationSubjectViewRequestBody: EducationSubjectViewRequestBody = new EducationSubjectViewRequestBody();
  public educationSubjectViewResponseBody: EducationSubjectViewResponseBody = new EducationSubjectViewResponseBody();


  getEducationSubject() {
    this.educationSubjectViewRequestBody.oid = this.educationSubjectOids.oid;
    this.educationSubjectViewRequestBody.educationCurriculumOid = this.educationSubjectOids.educationCurriculumOid;
    this.educationSubjectViewRequestBody.educationSessionOid = this.educationSubjectOids.educationSessionOid;

    this.educationSubjectViewRequest.header = this.header;
    this.educationSubjectViewRequest.body = this.educationSubjectViewRequestBody;

    this.educationSubjectService.getEducationSubjectByOid(this.educationSubjectViewRequest).subscribe(data => {
      if (data.header.responseCode == "200") {
        this.educationSubjectViewResponseBody = data.body;
      }
    });
  }

  editEducationSubjectInfo() {
    var routerPath = 'admin/education/subject/edit/';
    let items = [{ oid: this.educationSubjectOids.oid, educationCurriculumOid: this.educationSubjectOids.educationCurriculumOid, educationSessionOid: this.educationSubjectOids.educationSessionOid }];
    this.sharedDataService.setData(items);
    this._router.navigate([routerPath]);
  }

  goBack() {
    this._location.back();
  }

}
