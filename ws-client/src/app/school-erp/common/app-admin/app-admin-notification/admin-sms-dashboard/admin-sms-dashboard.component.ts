import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { RequestHeader } from '../../../shared/header/request-header';
import { InstituteDashboardInfoRequestBody } from '../../../shared/request/dashboard/school/institute-dashboard-info-request-body';
import { Header } from 'src/app/common/request/base-request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerConfiguration } from '../../../shared/model/ngx-spinner-configuration';
import { ConstantService } from 'src/app/common/services/constant.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { formatDate } from '@angular/common';
import { SmsDashboardService } from '../../../shared/services/sms/sms-dashboard.service';
import { SmsDashboardRequest } from '../../../shared/request/dashboard/school/sms-dashboard-request';
import { SmsDashboardRequestBody } from '../../../shared/request/dashboard/school/sms-dashboard-request-body';
import { SmsDashboardResponseBody } from '../../../shared/response/dashboard/school/sms-dashboard-response-body';
// import { SmsCountForChart } from './model/sms-count-for-chart';
// import { SmsCountListForChart } from './model/sms-count-list-for-chart';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-admin-sms-dashboard',
  templateUrl: './admin-sms-dashboard.component.html',
  styleUrls: ['./admin-sms-dashboard.component.scss']
})
export class AdminSmsDashboardComponent implements OnInit {

  maxDate: Date;

  constructor(
    private _smsDashboardService: SmsDashboardService,
    private _appStorageService: AppStorageService,
    private _router: Router,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _constantService: ConstantService,
    private _spinner: NgxSpinnerService
  ) {
    this.maxDate = new Date();
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }
  public spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();

  public locale: any;
  public today: string = moment().format('DD-MM-YYYY');
  public batchChartData: any;
  public attendanceOverviewChartData: any;
  public attendanceOverviewChart: any;
  public admissionChartConfig: any;
  public admissionChartData: any;
  public feesChartConfig: any;
  public admissionChart: any;
  public resultChartData: any;
  public feesChart: any;
  public resultChart: any;
  public batchChart: any;
  public batchChartConfig: any;
  public feesChartData: any;
  public resultChartConfig: any;

  public attendanceOverviewChartConfig: any;
  public header: Header = new Header();

  public userInfo: UserInfo = new UserInfo();
  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.locale = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });
    this.getSmsDashboardInfo();
  }


  instituteSmsDashboardRequest: SmsDashboardRequest = new SmsDashboardRequest();
  smsDashboardInfoRequestHeader: RequestHeader = new RequestHeader();
  instituteSmsDashboardRequestBody: SmsDashboardRequestBody = new SmsDashboardRequestBody();
  instituteSmsDashboard: SmsDashboardResponseBody = new SmsDashboardResponseBody();

  getSmsDashboardInfo() {
    this.smsDashboardInfoRequestHeader.requestId = this.header.requestId;
    this.smsDashboardInfoRequestHeader.requestDateTime = this.header.requestDateTime;
    this.smsDashboardInfoRequestHeader.requestSource = this.header.requestSource;
    this.smsDashboardInfoRequestHeader.requestServiceSource = this.header.requestServiceSource;

    this.instituteSmsDashboardRequest.header = this.smsDashboardInfoRequestHeader;
    this.instituteSmsDashboardRequest.body = this.instituteSmsDashboardRequestBody;
    this.instituteSmsDashboardRequest.body.instituteOid = this.userInfo.instituteOid;
    this.instituteSmsDashboardRequest.body.requestDate = this.today;

    this._spinner.show();
    this._smsDashboardService.getAdminSmsDashboardInfo(this.instituteSmsDashboardRequest).subscribe(data => {
      this._spinner.hide();
      this.instituteSmsDashboard = data.body;



    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      });
  }

  sentSms: Number[] = [];
  failedSms: Number[] = [];
  attendanceOverviewChartGenerate() {


    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Augast',
      'September',
      'October',
      'November',
      'December'
    ];
    this.attendanceOverviewChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Sent SMS',
          backgroundColor: '#2886c9',
          borderColor: '#2886c9',
          data: this.sentSms
        },
        // {
        //   label: 'Pending',
        //   backgroundColor: '#4ee16d',
        //   borderColor: '#4ee16d',
        //   data: [30, 50, 25, 45, 70, 68, 30, 30, 67, 70, 55, 45],
        // },
        {
          label: 'Failed',
          backgroundColor: '#c71503',
          borderColor: '#c71503',
          data: this.failedSms
        },
      ],
    };

    this.attendanceOverviewChartConfig = {
      type: 'line',
      data: this.attendanceOverviewChartData,
      options: {},
    };
    if (this.attendanceOverviewChart) {
      this.attendanceOverviewChart.destroy();
    }
    this.attendanceOverviewChart = new Chart(
      "attendanceOverviewChart",
      this.attendanceOverviewChartConfig
    );
  }

  admissionChartGenerate() {
    const labels = [
      'Male', 'Female'
    ];
    this.admissionChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Attendance Dataset',
          backgroundColor: ['#2886c9', '#28a745'],
          borderColor: ['#2886c9', '#28a745'],
          data: [1300, 800],
        },
      ],
    };

    this.admissionChartConfig = {
      type: 'doughnut',
      data: this.admissionChartData,
      options: {},
    };
    if (this.admissionChart) {
      this.admissionChart.destroy();
    }
    this.admissionChart = new Chart(
      "admissionChart",
      this.admissionChartConfig
    );
  }

  feesChartGenerate() {
    const labels = [
      'Fees',
    ];
    this.feesChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Attendance Dataset',
          backgroundColor: '#2886c9',
          borderColor: '#2886c9',
          data: [3],
        },
      ],
    };

    this.feesChartConfig = {
      type: 'doughnut',
      data: this.feesChartData,
      options: {},
    };
    if (this.feesChart) {
      this.feesChart.destroy();
    }
    this.feesChart = new Chart(
      "feesChart",
      this.feesChartConfig
    );
  }

  resultChartGenerate() {
    const labels = [
      'Admission',
      'Selection',
      'Approval',
      'Absent',
      'Present',
      'Exam',
      'Result'
    ];
    this.resultChartData = {
      labels: labels,
      datasets: [
        {
          label: 'SMS Count',
          backgroundColor: '#2886c9',
          borderColor: '#2886c9',
          data: [20, 20, 30, 40, 50, 60, 50],
        },
      ],
    };

    this.resultChartConfig = {
      type: 'bar',
      data: this.resultChartData,
      options: {},
    };
    if (this.resultChart) {
      this.resultChart.destroy();
    }
    this.resultChart = new Chart(
      "resultChart",
      this.resultChartConfig
    );
  }

  batchChartGenerate() {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Augast',
      'September',
      'October',
      'November',
      'December'
    ];
    this.batchChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Expense Dataset',
          backgroundColor: '#dc3545',
          borderColor: '#dc3545',
          data: [20, 20, 30, 40, 50, 60, 50, 60, 70, 80, 90, 100],
        },
      ],
    };

    this.batchChartConfig = {
      type: 'line',
      data: this.batchChartData,
      options: {},
    };
    if (this.batchChart) {
      this.batchChart.destroy();
    }
    this.batchChart = new Chart(
      "batchChart",
      this.batchChartConfig
    );
  }

}