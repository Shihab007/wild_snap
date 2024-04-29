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
import { SmsServiceLogList } from 'src/app/school-erp/common/shared/model/sms/sms-service-log-list';
import { SmsService } from 'src/app/school-erp/common/shared/services/sms/sms.service';
import { GetSmsServiceListRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-list-request';
import { GetSmsServiceListRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-list-request-body';
import { InstituteSmsServiceModel } from 'src/app/school-erp/common/shared/model/sms/institute-sms-service-model';

@Component({
  selector: 'app-admin-institute-sms-service-list',
  templateUrl: './admin-institute-sms-service-list.component.html',
  styleUrls: ['./admin-institute-sms-service-list.component.scss']
})
export class AdminInstituteSmsServiceListComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;




  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  // public smsServiceLogList: SmsServiceLogList[];

  header: Header = new Header();

  requestHeader: RequestHeader = new RequestHeader();

  dataSource = new MatTableDataSource<InstituteSmsServiceModel>();
  // selection = new SelectionModel<SmsServiceLogList>(true, []);

  displayedColumns: string[] = ['serialNumber', 'instituteLogo', 'instituteName', 'serviceName', 'presentSmsServiceStatus', 'requestSmsServiceStatus',
    'requestedOn', 'pendingRequest', 'status', 'actions'];
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
    this.getInstituteWiseSmsServiceList();
  }


  public instituteSmsServiceListRequest = new GetSmsServiceListRequest();
  public GetSmsServiceListRequestBody = new GetSmsServiceListRequestBody();
  getInstituteWiseSmsServiceList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.instituteSmsServiceListRequest.header = this.requestHeader;
    this.instituteSmsServiceListRequest.body = this.GetSmsServiceListRequestBody;
    this._smsService.getInstituteSmsServiceInfo(this.instituteSmsServiceListRequest).subscribe((data) => {
      console.log("*********************Get Institute wise sms service info List Response ******************** ");
      console.log(data);

      this.dataSource.data = data.body.instituteSmsServiceList;
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });

  }



  viewSmsServiceLogInfo(obj: any) {
    console.log("sms Service Details List object :");
    console.log(obj);
    var routerPath = 'admin/notification/sms-service/view/';
    var oid = obj.institute.oid;

    this.router.navigate([routerPath, oid]);
    var str = "SMS Service List of " + obj.institute.nameEn + " loaded successfully"
    this.toastr.success(str);
  }

  // private createFilter(): (smsServiceLogList: SmsServiceLogList, filter: string) => boolean {
  //   let filterFunction = function (smsServiceLogList, filter): boolean {
  //     return smsServiceLogList.titleNameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  //   }

  //   return filterFunction;
  // }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.dataSource.filterPredicate = this.createFilter();
    // setTimeout(() => this.setActiveLanguageLink());
  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewServiceLog(event: any) {
    console.log("***********view institute log**********");

    console.log(event);
    var routerPath = 'admin/notification/sms-service/log/';
    var oid = event.oid;

    this.router.navigate([routerPath, oid]);

  }

}
