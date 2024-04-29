import { Component, OnInit, ViewChild } from '@angular/core';
import { EducationSystemService } from 'src/app/school-erp/common/shared/services/education/education-system.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { EducationSystemList } from 'src/app/school-erp/common/shared/model/education/education-system-list';
import { EducationSystemListRequest } from 'src/app/school-erp/common/shared/request/education/education-system-list-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { EducationSystemListRequestBody } from 'src/app/school-erp/common/shared/request/education/education-system-list-request-body';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { GetEducationInfoRequest } from 'src/app/school-erp/common/shared/request/education/get-education-info-request';
import { GetEducationInfoRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-info-request-body';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';
import { EducationCurriculumEntity } from 'src/app/school-erp/common/shared/model/education/education-curriculum-entity';
import { EducationMediumEntity } from 'src/app/school-erp/common/shared/model/education/education-medium-entity';
import { ConstantService } from 'src/app/common/services/constant.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-education-system-list',
  templateUrl: './admin-education-system-list.component.html',
  styleUrls: ['./admin-education-system-list.component.scss']
})
export class AdminEducationSystemListComponent implements OnInit {

  public header: Header = new Header();
  public educationMediumList: EducationMediumEntity[];
  public educationCurriculumList: EducationCurriculumEntity[];
  public entity = { curriculumOid: '' };
  public searchFilter = new FormControl("");

  dataSource = new MatTableDataSource<EducationSystemList>();
  selection = new SelectionModel<EducationSystemList>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNo', 'curriculumNameEn', 'nameEn', 'shortName', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  classFilter: any;
  public locale: string;

  constructor(
    private educationSystemService: EducationSystemService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private educationService: EducationService,
    private constantService: ConstantService,
    private router: Router,
  ) { }

  public requestHeader: RequestHeader = new RequestHeader;
  public educationSystemListRequest: EducationSystemListRequest = new EducationSystemListRequest;
  public getEducationInfoRequest: GetEducationInfoRequest = new GetEducationInfoRequest();

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    })
    this.getEducationSystemList();
    this.getEducationInformation();
  }

  getEducationInformation() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getEducationInfoRequest.header = this.requestHeader;
    this.getEducationInfoRequest.body = new GetEducationInfoRequestBody();

    this.educationService.getEducationInfo(this.getEducationInfoRequest)
      .subscribe(response => {
        if (response.header.responseCode === "200") {
          this.educationMediumList = response.body.educationMediumList;
          this.educationCurriculumList = response.body.educationCurriculumList;
        }
      },
        (error) => {
          console.log(error);
          this.toastr.error(error.Message);
        }
      );
  }

  getEducationSystemList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.educationSystemListRequest.header = this.requestHeader;
    this.educationSystemListRequest.body = new EducationSystemListRequestBody;
    if (!this.constantService.isNullOrEmpty(this.entity.curriculumOid)) {
      this.educationSystemListRequest.body.educationCurriculumOid = this.entity.curriculumOid;
    }

    this.educationSystemService.educationSystemList(this.educationSystemListRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this.dataSource.data = data.body.educationSystemList;
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message)
      });
  }

  getEducationSystemListBySearchText(searchText: any) {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.educationSystemListRequest.header = this.requestHeader;
    this.educationSystemListRequest.body = new EducationSystemListRequestBody;
    this.educationSystemListRequest.body.searchText = searchText;

    this.educationSystemService.educationSystemList(this.educationSystemListRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this.dataSource.data = data.body.educationSystemList;
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message)
      });
  }


  goToAddEducationSystem() {
    var routerPath = 'admin/education/system/add/';
    this.router.navigate([routerPath]);
  }

  goToViewEducationSystem(oid: string) {
    var routerPath = 'admin/education/system/view/';
    this.router.navigate([routerPath + oid]);
  }

  goToEditEducationSystem(oid: string) {
    var routerPath = 'admin/education/system/edit/';
    this.router.navigate([routerPath + oid]);
  }

}
