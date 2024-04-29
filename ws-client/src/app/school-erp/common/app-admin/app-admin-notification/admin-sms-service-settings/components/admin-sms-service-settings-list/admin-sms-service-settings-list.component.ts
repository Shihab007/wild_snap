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
import { GetSmsServiceLogListRequest } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-log-list-request';
import { GetSmsServiceLogListRequestBody } from 'src/app/school-erp/common/shared/request/sms/get-sms-service-log-list-request-body';
import { SmsService } from 'src/app/school-erp/common/shared/services/sms/sms.service';
import * as moment from 'moment';
import { DropdownData } from 'src/app/common/constant/dropdown-data';
import { onOffList, smsLogListStatus } from 'src/app/common/constant/list-status';
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';
import { InstituteListRequest } from 'src/app/school-erp/common/shared/request/institute/institute-list-request';
import { InstituteListRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-list-request-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
@Component({
  selector: 'app-admin-sms-service-settings-list',
  templateUrl: './admin-sms-service-settings-list.component.html',
  styleUrls: ['./admin-sms-service-settings-list.component.scss']
})
export class AdminSmsServiceSettingsListComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  public buttonStateOn: boolean = true;
  public buttonStateOff: boolean = false;
  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  public smsServiceLogList: SmsServiceLogList[];

  header: Header = new Header();

  requestHeader: RequestHeader = new RequestHeader();

  dataSource = new MatTableDataSource<SmsServiceLogList>();
  selection = new SelectionModel<SmsServiceLogList>(true, []);

  displayedColumns: string[] = ['serialNumber', 'instituteLogo', 'instituteName', 'serviceName', 'presentSmsServiceStatus', 'requestSmsServiceStatus',
    'requestedOn', 'status', 'actions'];
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
    private _instituteService: InstituteService,
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

    this._instituteService.getInstituteList(this.instituteListRequest).subscribe((data) => {
      this.instituteList = data.body.instituteList;
      if (this.instituteList.length > 0) {
        this.selectedInstituteOid = this.instituteList[0].oid;
        this.getSmsServiceLogList();
      } else {
        this.selectedInstituteOid = '';
        this.getSmsServiceLogList();
      }
      // if (this.instituteList.length == 1) {
      //   this.entity.instituteOid = this.instituteList[0].oid;
      //   this.getInstituteInformation(this.entity.instituteOid);
      // }
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });
  }



  public selectedSmsServiceStatus: string = 'On';
  public selectedSmsLogListStatus: string = 'Pending';
  public selectedInstituteOid: string;
  onOffList: DropdownData[] = onOffList;
  smsLogListStatus: DropdownData[] = smsLogListStatus;
  getSmsServiceLogListRequest: GetSmsServiceLogListRequest = new GetSmsServiceLogListRequest();
  getSmsServiceLogListRequestBody: GetSmsServiceLogListRequestBody = new GetSmsServiceLogListRequestBody();


  getSmsServiceLogList() {
    this.getSmsServiceLogListRequest.body = this.getSmsServiceLogListRequestBody;
    this.getSmsServiceLogListRequest.body.instituteOid = this.selectedInstituteOid;
    this.getSmsServiceLogListRequest.body.status = this.selectedSmsLogListStatus;
    this.getSmsServiceLogListRequest.body.smsServiceStatus = this.selectedSmsServiceStatus;

    this._smsService.getSmsServiceLogList(this.getSmsServiceLogListRequest).subscribe(data => {
      data.body.smsServiceLogList.forEach(element => {
        element.requestedOn = moment(element.requestedOn).format('YYYY-MM-DD');
        element.approvedOn = moment(element.approvedOn).format('YYYY-MM-DD');
      });
      // moment(this.entity.approvedOn).format('YYYY-MM-DD');
      this.dataSource.data = data.body.smsServiceLogList;
      this.smsServiceLogList = this.dataSource.data;
    });


  }


  goToAddSmsServiceLog() {
    var routerPath = 'admin/notification/sms-service/add';
    this.router.navigate([routerPath]);
  }



  editSmsServiceLogInfo(obj: any) {
    var routerPath = 'admin/notification/sms-service/edit/';
    var oid = obj.oid;

    this.router.navigate([routerPath, oid]);
    this.toastr.success('smsServiceLogList information loaded successfully');
  }

  viewSmsServiceLogInfo(obj: any) {
    var routerPath = 'admin/notification/sms-service-setting/view/';
    var oid = obj.oid;

    this.router.navigate([routerPath, oid]);
    this.toastr.success('smsServiceLogList information loaded successfully');
  }

  private createFilter(): (smsServiceLogList: SmsServiceLogList, filter: string) => boolean {
    let filterFunction = function (smsServiceLogList, filter): boolean {
      return smsServiceLogList.titleNameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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
