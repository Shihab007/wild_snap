import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as Highcharts from 'highcharts';
import { AdminDashboardInfoService } from '../../shared/services/dashboard/admin-dashboard-info.service';
import { RequestHeader } from '../../shared/header/request-header';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConstantService } from 'src/app/common/services/constant.service';
import { AdminDashboardInfoRequest } from './Shared/request/admin-dashboard-info-request';
import { AdminDashboardInfoRequestBody } from './Shared/request/admin-dashboard-info-request-body';
import { AdminDashboardInfoResponseBody } from './Shared/response/admin-dashboard-info-response-body';
import { InstituteInfo } from './Shared/Model/institute-info';


@Component({
  selector: 'app-app-admin-dashboard',
  templateUrl: './app-admin-dashboard.component.html',
  styleUrls: ['./app-admin-dashboard.component.scss']
})
export class AppAdminDashboardComponent implements OnInit {
  public locale: any;

  constructor(
    private _appStorageService: AppStorageService,
    private translate: TranslateService,
    private adminDashboardInfoService: AdminDashboardInfoService,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private _constantService: ConstantService
  ) { }
  public header: Header = new Header();

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
      this.topTenInstituteChartBar();
      this.lessTenInstituteChartBar();
    });
    this.getAdminDashboardInfo();
  }
  public dashboardInfoRequestHeader: RequestHeader = new RequestHeader();
  public adminDashboardInfoRequestBody: AdminDashboardInfoRequestBody = new AdminDashboardInfoRequestBody();
  public adminDashboardInfoRequest: AdminDashboardInfoRequest = new AdminDashboardInfoRequest();
  public adminDashboard: AdminDashboardInfoResponseBody = new AdminDashboardInfoResponseBody();
  public topTenInstituteInfo: InstituteInfo[] = [];
  public lessTopInstituteInfo: InstituteInfo[];


  getAdminDashboardInfo() {
    this.dashboardInfoRequestHeader.requestId = this.header.requestId;
    this.dashboardInfoRequestHeader.requestDateTime = this.header.requestDateTime;
    this.dashboardInfoRequestHeader.requestSource = this.header.requestSource;
    this.dashboardInfoRequestHeader.requestServiceSource = this.header.requestServiceSource;

    this.adminDashboardInfoRequest.header = this.dashboardInfoRequestHeader;
    this.adminDashboardInfoRequest.body = this.adminDashboardInfoRequestBody;

    this._spinner.show();
    this.adminDashboardInfoService.getAdminDashboardInfo(this.adminDashboardInfoRequest).subscribe(data => {
      this._spinner.hide();
      this.adminDashboard = data.body;
      this.topTenInstituteInfo = data.body.topTenInstitute;
      this.lessTopInstituteInfo = data.body.lessTenInstitute;
      this.topTenInstituteChartBar();
      this.lessTenInstituteChartBar();

    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      });
  }


  private topTenInstituteChartBar(): void {

    Highcharts.chart('top-ten-institute-info', {
      chart: {
        type: 'bar',
      },
      title: {
        align: 'left',
        text: this.locale === "en" ? 'Top Ten Institute' : 'শীর্ষ দশ প্রতিষ্ঠান'
      },
      subtitle: {
        align: 'left',
        text: ''
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },
      tooltip: {
        pointFormat: '<b>{point.y:.2f}%</b> of total<br/>'
      },
      series: [
        {
          name: 'Doer School',
          data: this.topTenInstituteInfo.map(res => {
            return {
              name: this.locale === "en" ? res.nameEn : res.nameBn,
              y: Number(res.usesPercentage)
            };
          }),
        }
      ],
    } as any);
  }


  private lessTenInstituteChartBar(): void {
    const isBangla = this.locale === 'bn';

    Highcharts.chart('less-ten-institute-info', {
      chart: {
        type: 'bar',
      },
      title: {
        align: 'left',
        text: isBangla ? 'কম দশ প্রতিষ্ঠান' : 'Top Ten Institute'
      },
      subtitle: {
        align: 'left',
        text: ''
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },
      tooltip: {
        // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        // pointFormat: '<span style="color:{point.color}">{point.count}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        pointFormat: '<b>{point.y:.2f}%</b> of total<br/>'
      },
      series: [
        {
          name: isBangla ? 'দুয়ার স্কুল' : 'Doer School',
          data: this.lessTopInstituteInfo.map(res => {
            return {
              name: isBangla ? res.nameBn : res.nameEn,
              y: Number(res.usesPercentage)
            };
          }),
        }
      ],
    } as any);

  }


  ins: number[] = [];
  getTopInsListData() {
    let i = 0;
    this.topTenInstituteInfo.map(res => {
      this.ins[i++] = Number(res.usesPercentage);
    });
    return this.ins;
  }


}
