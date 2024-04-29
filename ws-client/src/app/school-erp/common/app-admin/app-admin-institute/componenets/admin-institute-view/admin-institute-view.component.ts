import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Header } from "src/app/common/request/base-request";
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { GetInstituteByOidRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-by-oid-request';
import { GetInstituteByOidRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-by-oid-request-body';
import { GetInstituteByOidResponseBody } from 'src/app/school-erp/common/shared/response/institute/get-institute-by-oid-response-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { InstituteShiftEntity } from 'src/app/school-erp/common/shared/model/institute/institute-shift-entity';
import { InstituteVersionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-version-entity';
import { InstituteGradingSystemEntity } from 'src/app/school-erp/common/shared/model/institute/institute-grading-system-entity';
import { InstituteTypeEntity } from 'src/app/school-erp/common/shared/model/institute/institute-type-entity';
import { InstituteClassEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-entity';
import { InstituteClassGroupEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-group-entity';
import { InstituteClassLevelEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-level-entity';
import { InstituteGradingSystemDetailsEntity } from 'src/app/school-erp/common/shared/model/institute/institute-grading-system-details-entity';
import { InstituteTextbookEntity } from 'src/app/school-erp/common/shared/model/institute/institute-textbook-entity';
declare var $: any;

@Component({
  selector: 'app-admin-institute-view',
  templateUrl: './admin-institute-view.component.html',
  styleUrls: ['./admin-institute-view.component.scss']
})
export class AdminInstituteViewComponent implements OnInit {
  public local: any;
  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();
  public getInstituteByOidRequest: GetInstituteByOidRequest = new GetInstituteByOidRequest();
  public getInstituteByOidRequestBody: GetInstituteByOidRequestBody = new GetInstituteByOidRequestBody();
  public institute: GetInstituteByOidResponseBody = new GetInstituteByOidResponseBody();
  activeTabName: string;
  instituteShiftList: InstituteShiftEntity[];
  instituteVersionList: InstituteVersionEntity[];
  instituteTypeList: InstituteTypeEntity[];
  instituteGradingSystemList: InstituteGradingSystemEntity[];
  instituteClassList: InstituteClassEntity[];
  instituteClassGroupList: InstituteClassGroupEntity[];
  instituteClassLevelList: InstituteClassLevelEntity[];
  gradingSystemDetailsList: InstituteGradingSystemDetailsEntity[];
  instituteTextbookList: InstituteTextbookEntity[];

  constructor(
    private _location: Location,
    private instituteService: InstituteService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.local = this._translate.currentLang;
    this.activeTabName = 'pills-basic';
    $('.nav-pills a[href=' + '"#' + this.activeTabName + '"' + ']').tab('show');
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });
    this.getInstituteByOid();
  }

  getActiveTabName(activeTabName: string) {
    this.activeTabName = activeTabName;
    console.log(this.activeTabName);
    $('.nav-pills a[href=' + '"#' + this.activeTabName + '"' + ']').tab('show');
  }


  getInstituteByOid() {
    console.log('Hello');


    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    console.log('ggg');

    this.getInstituteByOidRequest.header = this.requestHeader;
    this.getInstituteByOidRequestBody.oid = this._route.snapshot.params["oid"];
    this.getInstituteByOidRequest.body = this.getInstituteByOidRequestBody;

    this.instituteService.getInstituteByOid(this.getInstituteByOidRequest).subscribe(data => {

      console.log(data);

      if (data.header.responseCode === "200") {
        this.institute = data.body;
        console.log("Institute Details");

        console.log(this.institute);
        this.instituteShiftList = data.body.instituteShiftList;
        this.instituteVersionList = data.body.instituteVersionList;
        this.instituteTypeList = data.body.instituteTypeList;
        this.instituteGradingSystemList = data.body.instituteGradingSystemList;
        this.instituteClassList = data.body.instituteClassList;
        this.instituteClassGroupList = data.body.instituteClassGroupList;
        this.instituteClassLevelList = data.body.instituteClassLevelList;
        this.gradingSystemDetailsList = data.body.gradingSystemDetailsList;
        this.instituteTextbookList = data.body.instituteTextbookList;



      }
    },
      (error) => {
        console.log(error);
      }
    );
  }

  goBack() {
    this._location.back();
  }


}
