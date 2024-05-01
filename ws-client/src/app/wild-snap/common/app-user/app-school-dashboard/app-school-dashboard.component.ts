import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerConfiguration } from '../../shared/model/ngx-spinner-configuration';
import { ConstantService } from 'src/app/common/services/constant.service';
import * as Highcharts from 'highcharts';
import { RequestHeader } from '../../shared/header/request-header';
import { Header } from 'src/app/common/request/base-request';
import { InstituteDashboardAllInfoRequest } from './model/request/institute-dashboard-all-info-request';
import { InstituteDashboardAllInfoRequestBody } from './model/request/institute-dashboard-all-info-request-body';
import { InstituteDashboardAllInfoService } from '../../shared/services/dashboard/institute-dashboard-all-info.service';
import { InstituteDashboardAllInfoResponseBody } from './model/response/institute-dashboard-all-info-response-body';
import { NumberCount } from './model/models/number-count';
import { AdmissionStatusInfo } from './model/models/admission-status-info';
import { DashboardFeesInfo } from './model/models/dashboard-fees-info';
import { DashboardNoticeInfo } from './model/models/dashboard-notice-info';
import { StudentAttendanceInfo } from './model/models/student-attendance-info';
import { StudentBirthdayInfo } from './model/models/student-birthday-info';
import { TeacherAttendanceInfo } from './model/models/teacher-attendance-info';
import { TeacherBirthdayInfo } from './model/models/teacher-birthday-info';
import { ExamResultInfo } from './model/models/exam-result-info';
import { DashboardNotice } from './model/models/dashboard-notice';
import { AttendancePerDay } from './model/models/attendance-per-day';
import { StudentBirthday } from './model/models/student-birthday';
import { TeacherBirthday } from './model/models/teacher-birthday';
import { ExamResult } from './model/models/exam-result';
import { TeacherPerDayAttendance } from './model/models/teacher-per-day-attendance';
import { ExpenseRevenueInfo } from './model/models/expense-revenue-info';
import { ExpenseRevenue } from './model/models/expense-revenue';
const moment = _moment;

@Component({
  selector: 'app-app-school-dashboard',
  templateUrl: './app-school-dashboard.component.html',
  styleUrls: ['./app-school-dashboard.component.scss'],
})
export class AppSchoolDashboardComponent implements OnInit {
  maxDate: Date;
  totalAdmissionStudent: number = 55;
  totalAdmissionFee: number = 87;
  totalTutionFee: number = 23;
  totalFeeCollection: number = 65;
  totalDueFee: number = 98;

  constructor(
    private _appStorageService: AppStorageService,
    private _translate: TranslateService,
    private _constantService: ConstantService,
    private _instituteDashboardAllInfoService: InstituteDashboardAllInfoService,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private elementRef: ElementRef
  ) {
    this.maxDate = new Date();
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }
  public spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();

  public locale: any;
  public today: string = moment().format('DD-MM-YYYY');
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
      this.createChartPie();
      this.createExpenceAndRevinewBar();
      this.createDailyStudentAttenanceChartBar();
      this.createDailyTeacherAttenanceChartBar();
    });
    this.getInstituteDashboardInfo();
    this.updateDiameterBasedOnWindowSize();
  }

  public examResult: ExamResult[];
  public expenseRevenue: ExpenseRevenue[];
  public teacherBirthday: TeacherBirthday[];
  public studentBirthday: StudentBirthday[];
  public attendancePerDay: AttendancePerDay[] = [];
  public teacherPerDayAttendance: TeacherPerDayAttendance[] = [];
  public dashboardNotice: DashboardNotice[];
  public admissionStatusInfo = new AdmissionStatusInfo();
  public numberCount = new NumberCount();
  public expenseRevenueinfo = new ExpenseRevenueInfo();
  public dashboardFeesInfo = new DashboardFeesInfo();
  public dashboardNoticeInfo = new DashboardNoticeInfo();
  public studentAttendanceInfo = new StudentAttendanceInfo();
  public studentBirthdayInfo = new StudentBirthdayInfo();
  public teacherAttendanceInfo = new TeacherAttendanceInfo();
  public teacherBirthdayInfo = new TeacherBirthdayInfo();
  public examResultInfo = new ExamResultInfo();
  public instituteDashboardAllInfoRequest: InstituteDashboardAllInfoRequest = new InstituteDashboardAllInfoRequest();
  public instituteDashboardInfoRequestHeader: RequestHeader = new RequestHeader();
  public instituteDashboardAllInfoRequestBody: InstituteDashboardAllInfoRequestBody = new InstituteDashboardAllInfoRequestBody();
  public instituteDashboard: InstituteDashboardAllInfoResponseBody = new InstituteDashboardAllInfoResponseBody();

  getInstituteDashboardInfo() {
    this.instituteDashboardInfoRequestHeader.requestId = this.header.requestId;
    this.instituteDashboardInfoRequestHeader.requestDateTime = this.header.requestDateTime;
    this.instituteDashboardInfoRequestHeader.requestSource = this.header.requestSource;
    this.instituteDashboardInfoRequestHeader.requestServiceSource = this.header.requestServiceSource;

    this.instituteDashboardAllInfoRequest.header = this.instituteDashboardInfoRequestHeader;
    this.instituteDashboardAllInfoRequest.body = this.instituteDashboardAllInfoRequestBody;

    this._spinner.show();
    this._instituteDashboardAllInfoService.getInstituteDashboardInfo(this.instituteDashboardAllInfoRequest).subscribe(data => {
      this._spinner.hide();
      this.instituteDashboard = data.body;
      this.dashboardNotice = data.body.noticeInfo.dashboardNotice;
      this.studentBirthday = data.body.studentBirthdayInfo.studentBirthday;
      this.teacherBirthday = data.body.teacherBirthdayInfo.teacherBirthday;
      this.expenseRevenue = data.body.expenseRevenueInfo.expenseRevenue;
      this.examResult = data.body.examResultInfo.examResult;
      this.admissionStatusInfo = data.body.admissionInfo;

      const maxLength = 100;
      this.dashboardNotice = this.dashboardNotice.map(notice => {
        const descripEn = notice.descriptionEn;
        const slicedDescriptionEn = descripEn.length > maxLength ? descripEn.slice(0, maxLength) + '...' : descripEn;
        const descripBn = notice.descriptionBn;
        const slicedDescriptionBn = descripBn.length > maxLength ? descripBn.slice(0, maxLength) + '...' : descripBn;
        return { ...notice, descriptionEn: slicedDescriptionEn, descriptionBn: slicedDescriptionBn };

      });

      this.numberCount = this.instituteDashboard.count;
      this.expenseRevenueinfo = this.instituteDashboard.expenseRevenueInfo;
      this.dashboardFeesInfo = this.instituteDashboard.feesInfo;
      this.attendancePerDay = this.instituteDashboard.studentAttendanceInfo.perDay;
      this.teacherPerDayAttendance = this.instituteDashboard.teacherAttendanceInfo.teacherPerDayAttendance;
      this.studentBirthdayInfo = this.instituteDashboard.studentBirthdayInfo;
      this.teacherAttendanceInfo = this.instituteDashboard.teacherAttendanceInfo;
      this.teacherBirthdayInfo = this.instituteDashboard.teacherBirthdayInfo;
      this.examResultInfo = this.instituteDashboard.examResultInfo;

      console.log("--OK--");
      console.log(this.instituteDashboard);

      this.createChartPie();
      this.createDailyStudentAttenanceChartBar();
      this.createDailyTeacherAttenanceChartBar();
      this.createExpenceAndRevinewBar();
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        // this._toastr.error(error.Message);
      });
  }

  public showFullDescriptions: boolean = false;
  toggleDescription(notice: DashboardNotice) {
    notice.showFullDescription = !notice.showFullDescription;
  }
  getDescription(description: string) {
    if (this.showFullDescriptions) {
      return description;
    } else {
      const maxLength = 80;
      return description.length > maxLength
        ? description.slice(0, maxLength) + '...'
        : description;
    }
  }

  // public ngAfterViewInit(): void {
  //   this.createExpenceAndRevinewBar();
  // }

  private createChartPie(): void {
    const data: any[] = [{ name: "Application Student", subtittle: "Application", y: this.admissionStatusInfo.applicantCount },
    { name: "Selection Student", subtittle: "Selection", y: this.admissionStatusInfo.selectionCount },
    { name: "Approved Student", subtittle: "Approved", y: this.admissionStatusInfo.approveCount }];

    const chart = Highcharts.chart('chart-pie', {
      chart: {
        type: 'pie',
        height: 488,

      },
      title: {
        text: this.locale === "en" ? 'Student Admission Information' : 'ছাত্র-ছাত্রী ভর্তি তথ্য'
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">{point.key}</span><br>`,
        pointFormat: '<span>Number of Student: {point.y}</span>',
        useHTML: true,
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -35,
            format: '<span style="font-size:14px">{point.y}</span><br><span style="font-size:9px;">{point.subtittle}</span>'
          },
          style: {
            textOutline: 'none',
            lineHeight: '1',
            textAlign: 'center',
          }
        }
      },
      series: [{
        name: null,
        innerSize: '50%',
        data,
      }],
    } as any);
  }

  private classAttendance(data: any[], myClass: any) {
    const getData = data.find(i => i.nameEn === myClass);
    return getData ? getData.noOfStudent : 0;
  }

  private createDailyStudentAttenanceChartBar(): void {

    const dayNames = [];

    const dataSix = [];
    const dataSeven = [];
    const dataEight = [];
    const dataNine = [];
    const dataTen = [];

    this.attendancePerDay.forEach(e => {
      if (e.name.trim() == 'Saturday') {
        dataSix[0] = this.classAttendance(e.perDayAttendance, 'Class 6');
        dataSeven[0] = this.classAttendance(e.perDayAttendance, 'Class 7');
        dataEight[0] = this.classAttendance(e.perDayAttendance, 'Class 8');
        dataNine[0] = this.classAttendance(e.perDayAttendance, 'Class 9');
        dataTen[0] = this.classAttendance(e.perDayAttendance, 'Class 10');
        dayNames.push(e.name);

      } else if (e.name.trim() == 'Sunday') {
        dataSix[1] = this.classAttendance(e.perDayAttendance, 'Class 6');
        dataSeven[1] = this.classAttendance(e.perDayAttendance, 'Class 7');
        dataEight[1] = this.classAttendance(e.perDayAttendance, 'Class 8');
        dataNine[1] = this.classAttendance(e.perDayAttendance, 'Class 9');
        dataTen[1] = this.classAttendance(e.perDayAttendance, 'Class 10');
        dayNames.push(e.name);
      } if (e.name.trim() == 'Monday') {
        dataSix[2] = this.classAttendance(e.perDayAttendance, 'Class 6');
        dataSeven[2] = this.classAttendance(e.perDayAttendance, 'Class 7');
        dataEight[2] = this.classAttendance(e.perDayAttendance, 'Class 8');
        dataNine[2] = this.classAttendance(e.perDayAttendance, 'Class 9');
        dataTen[2] = this.classAttendance(e.perDayAttendance, 'Class 10');
        dayNames.push(e.name);
      } if (e.name.trim() == 'Tuesday') {
        dataSix[3] = this.classAttendance(e.perDayAttendance, 'Class 6');
        dataSeven[3] = this.classAttendance(e.perDayAttendance, 'Class 7');
        dataEight[3] = this.classAttendance(e.perDayAttendance, 'Class 8');
        dataNine[3] = this.classAttendance(e.perDayAttendance, 'Class 9');
        dataTen[3] = this.classAttendance(e.perDayAttendance, 'Class 10');
        dayNames.push(e.name);
      } if (e.name.trim() == 'Wednesday') {
        dataSix[4] = this.classAttendance(e.perDayAttendance, 'Class 6');
        dataSeven[4] = this.classAttendance(e.perDayAttendance, 'Class 7');
        dataEight[4] = this.classAttendance(e.perDayAttendance, 'Class 8');
        dataNine[4] = this.classAttendance(e.perDayAttendance, 'Class 9');
        dataTen[4] = this.classAttendance(e.perDayAttendance, 'Class 10');
        dayNames.push(e.name);
      } if (e.name.trim() == 'Thursday') {
        dataSix[5] = this.classAttendance(e.perDayAttendance, 'Class 6');
        dataSeven[5] = this.classAttendance(e.perDayAttendance, 'Class 7');
        dataEight[5] = this.classAttendance(e.perDayAttendance, 'Class 8');
        dataNine[5] = this.classAttendance(e.perDayAttendance, 'Class 9');
        dataTen[5] = this.classAttendance(e.perDayAttendance, 'Class 10');
        dayNames.push(e.name);
      }
    });

    Highcharts.chart('daily-student-attendance', {
      chart: {
        type: 'column',
      },
      title: {
        text: this.locale === "en" ? 'Weekly Student Attendance' : 'সাপ্তাহিক ছাত্র-ছাত্রী উপস্থিতি'
      },
      subtitle: {
        text: 'Attendance'
      },
      xAxis: {
        categories: dayNames,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Six',
        data: dataSix

      }, {
        name: 'Seven',
        data: dataSeven

      }, {
        name: 'Eight',
        data: dataEight

      }, {
        name: 'Nine',
        data: dataNine

      }, {
        name: 'Ten',
        data: dataTen

      }]
    } as any);
  }


  private createDailyTeacherAttenanceChartBar(): void {

    Highcharts.chart('daily-teacher-attendance', {
      chart: {
        type: 'column',
      },
      title: {
        align: 'left',
        text: this.locale === "en" ? 'Weekly Teacher Attendance' : 'সাপ্তাহিক শিক্ষক-শিক্ষিকার উপস্থিতি'
      },
      subtitle: {
        align: 'left',
        text: 'Teachers Attendance'
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
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
      series: [
        {
          name: 'Browsers',
          colorByPoint: true,
          data: this.teacherPerDayAttendance.map(res => {
            return {
              name: res.name,
              y: res.noOfTeacher,
            };
          }),
        },
      ],
    } as any);

  }

  months: String[] = [];
  expense: Number[] = [];
  revenue: Number[] = [];
  private createExpenceAndRevinewBar(): void {



    this.expenseRevenue.map(res => {
      this.months.push(res.month)
      this.expense.push(res.expenseAmount)
      this.revenue.push(res.revenueAmount)
    });

    Highcharts.chart('expence-revinew', {
      chart: {
        type: 'line',
        height: 488,
      },
      title: {
        text: this.locale === "en" ? 'Yearly Expence and Revenue' : 'বার্ষিক ব্যয় এবং আয়'
      },
      subtitle: {
        text: 'Earning'
      },
      xAxis: {
        // categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        categories: this.months
      },
      yAxis: {
        title: {
          text: 'Taka'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [
        {
          name: 'Expence',
          data: this.expense
        }, {
          name: 'Revenue',
          data: this.revenue
        }]
    } as any);

  }


  spinnerDiameter = 120;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateDiameterBasedOnWindowSize();
  }

  private updateDiameterBasedOnWindowSize(): void {
    const windowWidth = this.elementRef.nativeElement.ownerDocument.defaultView.innerWidth;

    if (windowWidth >= 1601) {
      this.spinnerDiameter = 120;
    } else if (windowWidth >= 1501) {
      this.spinnerDiameter = 105;
    } else if (windowWidth >= 1401) {
      this.spinnerDiameter = 95;
    } else if (windowWidth >= 1301) {
      this.spinnerDiameter = 90;
    } else if (windowWidth >= 1201) {
      this.spinnerDiameter = 70;
    } else {
      this.spinnerDiameter = 120;
    }
  }
}



