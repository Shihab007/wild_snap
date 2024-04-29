import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';
import { EducationMediumEntity } from 'src/app/school-erp/common/shared/model/education/education-medium-entity';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEducationCurriculumList } from 'src/app/school-erp/common/shared/model/curriculum/admin-education-curriculum-list';
import { AdminEducationCurriculumListRequest } from 'src/app/school-erp/common/shared/request/curriculum/admin-education-curriculum-list-request';
import { AdminEducationCurriculumListRequestBody } from 'src/app/school-erp/common/shared/request/curriculum/admin-education-curriculum-list-request-body';

@Component({
  selector: 'app-admin-education-curriculum-list',
  templateUrl: './admin-education-curriculum-list.component.html',
  styleUrls: ['./admin-education-curriculum-list.component.scss']
})
export class AdminEducationCurriculumListComponent implements OnInit {

  public header: Header = new Header();
  public educationMediumList: EducationMediumEntity[];
  public educationCurriculumList: AdminEducationCurriculumList[];
  public entity = { curriculumOid: '' };
  public searchFilter = new FormControl("");

  dataSource = new MatTableDataSource<AdminEducationCurriculumList>();
  selection = new SelectionModel<AdminEducationCurriculumList>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNo', 'name', 'shortName', 'educationMedium', 'countryName', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  classFilter: any;
  public locale: string;

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private educationService: EducationService,
    private router: Router,
  ) { }

  public requestHeader: RequestHeader = new RequestHeader;
  public adminEducationCurriculumListRequest: AdminEducationCurriculumListRequest = new AdminEducationCurriculumListRequest;
  public adminEducationCurriculumListRequestBody: AdminEducationCurriculumListRequestBody = new AdminEducationCurriculumListRequestBody();

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    })
    this.getEducationCurriculumList();
  }

  getEducationCurriculumList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.adminEducationCurriculumListRequest.header = this.requestHeader;
    this.adminEducationCurriculumListRequest.body = this.adminEducationCurriculumListRequestBody;

    this.educationService.getEducationCurriculumList(this.adminEducationCurriculumListRequest).subscribe(data => {
      if (data.header.responseCode === "200") {
        this.dataSource.data = data.body.list;
      }
    },
      (error) => {
        console.log(error);
        this.toastr.error(error.Message)
      });
  }


  private createFilter(): (list: AdminEducationCurriculumList, filter: string) => boolean {
    let filterFunction = function (list, filter): boolean {
      return list.nameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1,
        list.shortName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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


  goToAddEducationCurriculum() {
    var routerPath = 'admin/education/curriculum/add/';
    this.router.navigate([routerPath]);
  }

  goToViewEducationCurriculumn(oid: string) {
    var routerPath = 'admin/education/curriculum/view/';
    this.router.navigate([routerPath + oid]);
  }

  goToEditEducationCurriculumn(oid: string) {
    var routerPath = 'admin/education/curriculum/edit/';
    this.router.navigate([routerPath + oid]);
  }

}
