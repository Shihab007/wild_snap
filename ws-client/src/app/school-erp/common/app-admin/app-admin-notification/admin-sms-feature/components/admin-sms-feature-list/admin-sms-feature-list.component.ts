import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { SmsFeatureList } from 'src/app/school-erp/common/shared/model/sms/sms-feature-list';
import { GetSmsFeatureListRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-feature-list-request';
import { GetSmsFeatureListRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-feature-list-request-body';
import { SmsFeature } from 'src/app/school-erp/common/shared/services/sms/sms.feature';

@Component({
  selector: 'app-admin-sms-feature-list',
  templateUrl: './admin-sms-feature-list.component.html',
  styleUrls: ['./admin-sms-feature-list.component.scss']
})
export class AdminSmsFeatureListComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  public smsFeatureList: SmsFeatureList[];
  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();

  dataSource = new MatTableDataSource<SmsFeatureList>();
  selection = new SelectionModel<SmsFeatureList>(true, []);

  displayedColumns: string[] = ['serialNumber', 'nameEn', 'smsLanguage', 'applicableFor', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  param1: any;
  param2: any;

  constructor(
    private _smsService: SmsFeature,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private _appStorageService: AppStorageService,
  ) { }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });

    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.getSMSFeatureList();
  }

  public getSmsFeatureListRequest: GetSmsFeatureListRequest = new GetSmsFeatureListRequest();
  public getSmsFeatureListRequestBody: GetSmsFeatureListRequestBody = new GetSmsFeatureListRequestBody();

  getSMSFeatureList() {
    this.getSmsFeatureListRequest.body = this.getSmsFeatureListRequestBody;
    // this.getSmsFeatureListRequest.body.instituteOid = this.userInfo.instituteOid;
    console.log("messageTemplateList list Request body :");
    console.log(this.getSmsFeatureListRequest);

    this._smsService.getInstituteSmsFeatureList(this.getSmsFeatureListRequest).subscribe(data => {
      console.log('messageTemplateList list');
      console.log(data.body.smsFeatureList);
      this.dataSource.data = data.body.smsFeatureList;
      this.smsFeatureList = this.dataSource.data;
    });
  }


  goToSMSFeatureEditPage(obj: any) {
    var routerPath = 'admin/notification/sms-feature/edit/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  goToSMSFeatureViewPage(obj: any) {
    var routerPath = 'admin/notification/sms-feature/view/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  // goToSMSFeatureLogViewPage(obj: any) {
  //   var routerPath = 'school/notification/sms-feature/log-view/';
  //   var oid = obj.oid;
  //   this.router.navigate([routerPath, oid]);
  // }

  private createFilter(): (smsFeatureList: SmsFeatureList, filter: string) => boolean {
    let filterFunction = function (smsFeatureList, filter): boolean {
      return smsFeatureList.nameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        smsFeatureList.status.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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
