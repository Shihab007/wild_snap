import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { ConstantService } from 'src/app/common/services/constant.service';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { EducationBoardEntity } from 'src/app/school-erp/common/shared/model/education/education-board-entity';
import { EducationCurriculumEntity } from 'src/app/school-erp/common/shared/model/education/education-curriculum-entity';
import { EducationMediumEntity } from 'src/app/school-erp/common/shared/model/education/education-medium-entity';
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';
import { GetEducationInfoRequest } from 'src/app/school-erp/common/shared/request/education/get-education-info-request';
import { GetEducationInfoRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-info-request-body';
import { InstituteListRequest } from 'src/app/school-erp/common/shared/request/institute/institute-list-request';
import { InstituteListRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-list-request-body';
import { GetEducationInfoResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-info-response-body';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import * as _ from 'underscore';
import { AdminConfigureInstituteScheduleMessageDialogComponent } from '../admin-configure-institute-schedule-message-dialog/admin-configure-institute-schedule-message-dialog.component';
import { SharedDataService } from 'src/app/school-erp/common/shared/model/education-subject/educaiton-subject-data-store';

@Component({
  selector: 'app-admin-institute-list',
  templateUrl: './admin-institute-list.component.html',
  styleUrls: ['./admin-institute-list.component.scss']
})
export class AdminInstituteListComponent implements OnInit {

  public locale: any;
  public header: Header = new Header();

  public buttonStateOn: boolean = true;
  public buttonStateOff: boolean = false;

  public entity = { educationMediumOid: '', educationCurriculumOid: '', educationBoardOid: '', districtOid: '' };

  public educationBoardList: EducationBoardEntity[];
  public educationMediumList: EducationMediumEntity[];
  public educationCurriculumList: EducationCurriculumEntity[];

  dataSource = new MatTableDataSource<InstituteList>();
  selection = new SelectionModel<InstituteList>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    "serialNumber",
    "logoUrl",
    "nameEn",
    "educationMediumNameEn",
    "curriculumNameEn",
    "districtNameEn",
    "educationBoardShortName",
    "status",
    "scheduleMessagePush",
    "actions"
  ];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
    private _dialog: MatDialog,
    private educationInfoService: EducationService,
    private instituteService: InstituteService,
    private constantService: ConstantService,
    private sharedDataService: SharedDataService
  ) {
  }

  public requestHeader: RequestHeader = new RequestHeader();
  public instituteListRequestBody: InstituteListRequestBody = new InstituteListRequestBody();

  public getEducationInfoRequest: GetEducationInfoRequest = new GetEducationInfoRequest();
  public getEducationInfoRequestBody: GetEducationInfoRequestBody = new GetEducationInfoRequestBody();
  public educationInfo: GetEducationInfoResponseBody = new GetEducationInfoResponseBody();

  goToInstituteViewPage(obj: any) {
    var routerPath = 'admin/institute/view/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  goToInstituteEntryPage() {
    this.router.navigate(['admin/institute/add']);
  }

  goToInstituteEditPage(obj: any) {
    var routerPath = 'admin/institute/edit/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  onChangeInstituteClass(event: any) {
    console.log(event);
    console.log(this.entity);
  }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    });

    this.getEducationInformation();
    this.getInstituteList();
  }

  instituteListRequest: InstituteListRequest = new InstituteListRequest();
  getInstituteList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.instituteListRequest.body = this.instituteListRequestBody;

    if (!this.constantService.isNullOrEmpty(this.entity.educationMediumOid)) {
      this.instituteListRequest.body.educationMediumOid = this.entity.educationMediumOid;
      this.educationCurriculumList = [];
      this.entity.educationCurriculumOid = null;
      this.educationCurriculumList = _.where(this.educationInfo.educationCurriculumList, { educationMediumOid: this.entity.educationMediumOid })

    }
    if (!this.constantService.isNullOrEmpty(this.entity.educationCurriculumOid)) {
      this.instituteListRequest.body.educationCurriculumOid = this.entity.educationCurriculumOid;
    }
    if (!this.constantService.isNullOrEmpty(this.entity.educationBoardOid)) {
      this.instituteListRequest.body.educationBoardOid = this.entity.educationBoardOid;
    }
    if (!this.constantService.isNullOrEmpty(this.entity.districtOid)) {
      this.instituteListRequest.body.districtOid = this.entity.districtOid;
    }

    this.instituteService
      .getInstituteList(this.instituteListRequest)
      .subscribe((data) => {
        if (data.header.responseCode === "200") {
          this.dataSource.data = data.body.instituteList;
          this.toastr.success('Successfully load Institute Information');
        }
      },
        (error) => {
          console.log(error);
          this.toastr.error(error.Message);
        }
      );
  }


  getEducationInformation() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getEducationInfoRequest.header = this.requestHeader;
    this.getEducationInfoRequest.body = this.getEducationInfoRequestBody;

    console.log(this.getEducationInfoRequest);
    this.educationInfoService.getEducationInfo(this.getEducationInfoRequest)
      .subscribe(response => {
        this.educationInfo = response.body;
        this.educationBoardList = response.body.educationBoardList;
        this.educationMediumList = response.body.educationMediumList;
        this.educationCurriculumList = response.body.educationCurriculumList;
      });
  }


  goToScheduleMessageConfiguration(obj: any) {

    const dialogConfig = new MatDialogConfig();
    let instituteInfoParameter = obj;
    console.log(instituteInfoParameter);
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    // dialogConfig.height = "70%";

    dialogConfig.data = { "instituteInfoParameter": instituteInfoParameter };
    this._dialog.open(AdminConfigureInstituteScheduleMessageDialogComponent, dialogConfig).afterClosed().subscribe(res => {

      if (res != 'No') {

      } else {
        // 
      }
    });
  }




  private createFilter(): (instituteList: InstituteList, filter: string) => boolean {
    let filterFunction = function (instituteList, filter): boolean {
      return instituteList.nameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || instituteList.instituteVersionNameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || instituteList.instituteSessionNameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || instituteList.mobileNo.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }

    return filterFunction;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
    // setTimeout(() => this.setActiveLanguageLink());
  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}


