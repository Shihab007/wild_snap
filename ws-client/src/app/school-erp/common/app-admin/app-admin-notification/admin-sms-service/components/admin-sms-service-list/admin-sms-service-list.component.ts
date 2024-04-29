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
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';
import { SmsServiceList } from 'src/app/school-erp/common/shared/model/sms/sms-service-list';
import { InstituteListRequest } from 'src/app/school-erp/common/shared/request/institute/institute-list-request';
import { InstituteListRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-list-request-body';
import { GetSmsServiceListRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-list-request';
import { GetSmsServiceListRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-list-request-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { SmsService } from 'src/app/school-erp/common/shared/services/sms/sms.service';

@Component({
  selector: 'app-admin-sms-service-list',
  templateUrl: './admin-sms-service-list.component.html',
  styleUrls: ['./admin-sms-service-list.component.scss']
})
export class AdminSmsServiceListComponent implements OnInit {

  public buttonStateOn: boolean = true;
  public buttonStateOff: boolean = false;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  public smsServiceList: SmsServiceList[];
  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();

  dataSource = new MatTableDataSource<SmsServiceList>();
  selection = new SelectionModel<SmsServiceList>(true, []);

  displayedColumns: string[] = ['serialNumber', 'nameEn', 'smsLanguage', 'smsPush', 'emailLanguage', 'emailPush', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  param1: any;
  param2: any;

  constructor(
    private _smsService: SmsService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private instituteService: InstituteService,
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
    this.getInstituteList();
    this.getSmsServiceListList();
  }

  public instituteList: InstituteList[];
  instituteListRequest: InstituteListRequest = new InstituteListRequest();
  public instituteListRequestBody: InstituteListRequestBody = new InstituteListRequestBody();

  getInstituteList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.instituteListRequest.body = this.instituteListRequestBody;

    console.log("Get Institute List Request : ");
    console.log(this.instituteListRequest);
    this.instituteService.getInstituteList(this.instituteListRequest).subscribe((data) => {
      console.log("Get Institute List Response : ");
      console.log(data);
      this.instituteList = data.body.instituteList;
      console.log(this.instituteList);
      // if (this.instituteList.length == 1) {
      //   this.entity.instituteOid = this.instituteList[0].oid;
      //   this.getInstituteInformation(this.entity.instituteOid);
      // }
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });
  }


  public getSmsServiceListRequest: GetSmsServiceListRequest = new GetSmsServiceListRequest();
  public getSmsServiceListRequestBody: GetSmsServiceListRequestBody = new GetSmsServiceListRequestBody();

  getSmsServiceListList() {
    this.getSmsServiceListRequest.body = this.getSmsServiceListRequestBody;
    console.log("messageTemplateList list Request body :");
    console.log(this.getSmsServiceListRequest);

    this._smsService.getInstituteSmsServiceList(this.getSmsServiceListRequest).subscribe(data => {
      console.log('messageTemplateList list');
      console.log(data.body.smsServiceList);
      this.dataSource.data = data.body.smsServiceList;
      this.smsServiceList = this.dataSource.data;
    });
  }




  goToSMSServiceEditPage(obj: any) {
    var routerPath = 'admin/notification/sms-service/edit/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  goToSMSServiceViewPage(obj: any) {
    var routerPath = 'admin/notification/sms-service/view/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  goToSMSServiceLogViewPage(obj: any) {
    var routerPath = 'admin/notification/sms-service/log-view/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  private createFilter(): (smsServiceList: SmsServiceList, filter: string) => boolean {
    let filterFunction = function (smsServiceList, filter): boolean {
      return smsServiceList.titleNameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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
