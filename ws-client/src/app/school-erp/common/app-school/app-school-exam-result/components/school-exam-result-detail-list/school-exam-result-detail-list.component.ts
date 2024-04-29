import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Message } from "primeng/api";
import { Subscription } from "rxjs";
import { DEMO_INSTITUTE_OID, USER_INFO_LOCAL_STORAGE_KEY } from "src/app/common/constant/constant";
import { Header } from "src/app/common/request/base-request";
import { AppStorageService } from "src/app/login/auth/app-storage.service";
import { UserInfo } from "src/app/login/shared/model/user-info";
import { RequestHeader } from "src/app/school-erp/common/shared/header/request-header";
import { ExamResultDetailList } from "src/app/school-erp/common/shared/model/exam-result/exam-result-detail-list";
import { InstituteClassEntity } from "src/app/school-erp/common/shared/model/institute/institute-class-entity";
import { InstituteShiftEntity } from "src/app/school-erp/common/shared/model/institute/institute-shift-entity";
import { AdmissionListRequest } from "src/app/school-erp/common/shared/request/admission/admission-list-request";
import { AdmissionListRequestBody } from "src/app/school-erp/common/shared/request/admission/admission-list-request-body";
import { ExamResultDetailListRequest } from "src/app/school-erp/common/shared/request/exam-result/exam-result-detail-list-request";
import { ExamResultDetailListRequestBody } from "src/app/school-erp/common/shared/request/exam-result/exam-result-detail-list-request-body";
import { GetInstituteInfoRequest } from "src/app/school-erp/common/shared/request/institute/get-institute-info-request";
import { GetInstituteInfoRequestBody } from "src/app/school-erp/common/shared/request/institute/get-institute-info-request-body";
import { AdmissionService } from "src/app/school-erp/common/shared/services/admission/admission.service";
import { ExamResultService } from "src/app/school-erp/common/shared/services/exam-result/exam-result.service";
import { InstituteService } from "src/app/school-erp/common/shared/services/institute/institute.service";



@Component({
  selector: 'app-school-exam-result-detail-list',
  templateUrl: './school-exam-result-detail-list.component.html',
  styleUrls: ['./school-exam-result-detail-list.component.scss']
})
export class SchoolExamResultDetailListComponent implements OnInit {

  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public locale: any;

  public classList: InstituteClassEntity[];
  public shiftList: InstituteShiftEntity[];

  param1: any;
  param2: any;

  dataSource = new MatTableDataSource<ExamResultDetailList>();
  selection = new SelectionModel<ExamResultDetailList>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    "serialNumber",
    "sessionNameEn",
    "examNameEn",
    "classNameEn",
    "shiftNameEn",
    "versionNameEn",
    "classSectionNameBn",
    "status",
    "actions",
  ];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];

  constructor(
    private admissionService: AdmissionService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private instituteService: InstituteService,
    private examResultService: ExamResultService,
    private _appStorageService: AppStorageService,
    private router: Router
  ) { }


  requestHeader: RequestHeader = new RequestHeader();
  admissionListRequest: AdmissionListRequest = new AdmissionListRequest();
  admissionListRequestBody: AdmissionListRequestBody = new AdmissionListRequestBody();

  examResultDetailListRequest: ExamResultDetailListRequest = new ExamResultDetailListRequest();
  examResultDetailListRequestBody: ExamResultDetailListRequestBody = new ExamResultDetailListRequestBody();

  getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();

  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });

    //this.getAdmissionApplicationList(null, null);
    this.getInstituteInformation();
    this.getExamResultDetailList();
  }

  goToExamResultViewPage(obj: any) {
    var routerPath = 'school/exam-result/detail-view/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  goToExamResultEditPage(obj: any) {
    var routerPath = 'school/exam-result/edit/';
    var oid = obj.oid;
    this.router.navigate([routerPath, oid]);
  }

  goToExamResultEntryPage() {
    this.router.navigate(['school/exam-result/add']);
  }

  getExamResultDetailList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.examResultDetailListRequest.header = this.requestHeader;
    this.examResultDetailListRequest.body = this.examResultDetailListRequestBody;
    this.examResultDetailListRequest.body.instituteOid = this.userInfo.instituteOid;

    console.log("this.allAdmissionListRequest");
    console.log(this.examResultDetailListRequest);
    this.examResultService
      .getExamResultDetailList(this.examResultDetailListRequest)
      .subscribe((data) => {
        console.log("Exam Result Detail List : ");
        console.log(data);
        console.log(data.body.examResultList);
        this.dataSource.data = data.body.examResultList;
        this.toastr.success('Successfully load Admission Information');
      },
        (error) => {
          console.log(error);
        }
      );
  }

  getAdmissionApplicationList(classOid: any, shiftOid: any) {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.admissionListRequest.header = this.requestHeader;
    this.admissionListRequest.body = this.admissionListRequestBody;
    this.admissionListRequest.body.status = "Submitted";

    if (classOid == undefined || classOid == null) {
      this.admissionListRequest.body.instituteClassOid = null;
    } else {
      this.admissionListRequest.body.instituteClassOid = classOid;
    }

    if (shiftOid == undefined || shiftOid == null) {
      this.admissionListRequest.body.instituteShiftOid = null;

    } else {
      this.admissionListRequest.body.instituteShiftOid = shiftOid;

    }
    console.log("this.allAdmissionListRequest");
    console.log(this.admissionListRequest);
    this.admissionService
      .getAdmissionList(this.admissionListRequest)
      .subscribe((data) => {
        console.log(data);
        console.log(data.body.admissionList);
        // this.dataSource.data = data.body.admissionList;
        this.toastr.success('Successfully load Admission Information');
      },
        (error) => {
          console.log(error);
        }
      );
  }

  getInstituteInformation() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteInfoRequest.header = this.requestHeader;
    this.getInstituteInfoRequest.body = this.getInstituteInfoRequestBody;
    this.getInstituteInfoRequest.body.oid = DEMO_INSTITUTE_OID;

    console.log("Get Institute Info Request : ");
    console.log(this.getInstituteInfoRequest);
    this.instituteService
      .getInstituteInfo(this.getInstituteInfoRequest)
      .subscribe((data) => {
        console.log("Get Institute Info Response : ");
        console.log(data);
        this.shiftList = data.body.shiftList;
        this.classList = data.body.classList;
        //this.sessionList = data.body.sessionList;
        //this.versionList = data.body.versionList;
      },
        (error) => {
          console.log(error);
          this.toastr.error(error.Message);
        }
      );
  }




  onChangeInstituteClass(event: any) {
    this.param1 = event;
    this.getAdmissionApplicationList(this.param1, this.param2);

  }

  onChangeInstituteShift(event: any) {
    this.param2 = event;
    this.getAdmissionApplicationList(this.param1, this.param2);

  }

  private createFilter(): (examResultDetailList: ExamResultDetailList, filter: string) => boolean {
    let filterFunction = function (examResultDetailList, filter): boolean {
      return examResultDetailList.examNameEn.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || examResultDetailList.examNameBn.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
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
