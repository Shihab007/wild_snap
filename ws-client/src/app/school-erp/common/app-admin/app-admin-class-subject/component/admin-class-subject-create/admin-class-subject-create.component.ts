import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from "src/app/common/request/base-request";
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { DataList } from 'src/app/school-erp/common/shared/model/common/data-list';
import { Exam } from 'src/app/school-erp/common/shared/model/exam/exam';
import { ExamClass } from 'src/app/school-erp/common/shared/model/exam/exam-class';
import { ExamTime } from 'src/app/school-erp/common/shared/model/exam/exam-time';
import { AddExamRequest } from 'src/app/school-erp/common/shared/request/exam/add-exam-request';
import { AddExamRequestBody } from 'src/app/school-erp/common/shared/request/exam/add-exam-request-body';
import { GradingSystemListRequest } from 'src/app/school-erp/common/shared/request/grading/grading-system-list-request';
import { GradingSystemListRequestBody } from 'src/app/school-erp/common/shared/request/grading/grading-system-list-request-body';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { Router } from '@angular/router';
import { InstituteGradingSystemEntity } from 'src/app/school-erp/common/shared/model/institute/institute-grading-system-entity';
import { InstituteClassSection } from 'src/app/school-erp/common/shared/model/institute/institute-class-section';
import { InstituteShiftEntity } from 'src/app/school-erp/common/shared/model/institute/institute-shift-entity';
import { Location } from '@angular/common';
import { DropdownData } from 'src/app/common/constant/dropdown-data';
import { examTypeList } from 'src/app/common/constant/exam-type';
import { InstituteClassEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-entity';
import { GetClassListBySessionOidRequest } from 'src/app/school-erp/common/shared/request/class/get-class-list-by-session-oid-request';
import { GetClassListBySessionOidRequestBody } from 'src/app/school-erp/common/shared/request/class/get-class-list-by-session-oid-request-body';
import { ClassService } from 'src/app/school-erp/common/shared/services/class/class.service';
import { CreateInsituteClassSubjectRequest } from 'src/app/school-erp/common/shared/request/institute-class-subject/create-insitute-class-subject-request';
import { CreateInsituteClassSubjectRequestBody } from 'src/app/school-erp/common/shared/request/institute-class-subject/create-insitute-class-subject-request-body';
import { SaveClassSubject } from 'src/app/school-erp/common/shared/model/institute-class-subject/save-class-subject';
import { InstituteClassSubjectService } from 'src/app/school-erp/common/shared/services/institute-class-subject/institute-class-subject.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerConfiguration } from 'src/app/school-erp/common/shared/model/ngx-spinner-configuration';
import { ConstantService } from 'src/app/common/services/constant.service';
import { GetSubjectListByInstituteTypeRequest } from 'src/app/school-erp/common/shared/request/institute-class-subject/get-subject-list-by-institute-type-request';
import { GetSubjectListByInstituteTypeRequestBody } from 'src/app/school-erp/common/shared/request/institute-class-subject/get-subject-list-by-institute-type-request-body';
import { SubjectByInstituteType } from 'src/app/school-erp/common/shared/model/institute-class-subject/subject-by-institute-type';
import { GetInstituteClassSubjectListRequestBody } from 'src/app/school-erp/common/shared/request/institute-class-subject/get-institute-class-subject-list-request-body';
import { GetInstituteClassSubjectListRequest } from 'src/app/school-erp/common/shared/request/institute-class-subject/get-institute-class-subject-list-request';
import { InstituteClassSubject } from 'src/app/school-erp/common/shared/model/institute-class-subject/institute-class-subject';
import * as _ from 'underscore';
import { InstituteListRequest } from 'src/app/school-erp/common/shared/request/institute/institute-list-request';
import { InstituteListRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-list-request-body';
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';

@Component({
  selector: 'app-admin-class-subject-create',
  templateUrl: './admin-class-subject-create.component.html',
  styleUrls: ['./admin-class-subject-create.component.scss']
})
export class AdminClassSubjectCreateComponent implements OnInit {

  constructor(
    private _insituteClassSubjectService: InstituteClassSubjectService,
    private _instituteService: InstituteService,
    private _translate: TranslateService,
    private _appStorageService: AppStorageService,
    private _toastr: ToastrService,
    private _router: Router,
    private _location: Location,
    private _classService: ClassService,
    private _constantService: ConstantService,
    private _spinner: NgxSpinnerService
  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }
  public spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();

  @ViewChild('selectSchool') selectSchool: any;
  @ViewChild('selectSession') selectSession: any;
  @ViewChild('selectClass') selectClass: any;

  public userInfo: UserInfo = new UserInfo();
  public header: Header = new Header();
  public local: any;

  public examTimeListValidateCheck = true;
  public examClassListValidateCheck = true;

  public exam: Exam;
  public examTimes: ExamTime[] = [];
  public examTime: ExamTime;

  public sessionList: DataList[];

  public allclassList: InstituteClassEntity[];
  public sessionClassList: InstituteClassEntity[];
  public examTypeList: DropdownData[] = examTypeList;

  public finalClassList: ExamClass[] = [];
  public gradingSystemList: InstituteGradingSystemEntity[];
  public submitCheck: boolean;

  public classSection: InstituteClassSection[] = [];
  public shiftEntity: InstituteShiftEntity[] = [];


  public requestHeader: RequestHeader = new RequestHeader();

  public addExamRequest: AddExamRequest = new AddExamRequest();
  public addExamRequestBody: AddExamRequestBody = new AddExamRequestBody();

  public gradingSystemListRequest: GradingSystemListRequest = new GradingSystemListRequest();
  public gradingSystemListRequestBody: GradingSystemListRequestBody = new GradingSystemListRequestBody();

  public getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  public getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();

  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.examTime = new ExamTime();
    this.examTime.oid = String(0);
    this.examTimes.push(this.examTime);

    this.local = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });

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

    console.log("Get Institute List Request : ");
    console.log(this.instituteListRequest);
    this._instituteService.getInstituteList(this.instituteListRequest).subscribe((data) => {
      console.log("Get Institute List Response : ");
      console.log(data);
      this.instituteList = data.body.instituteList;
      console.log(this.instituteList);
      if (this.instituteList.length == 1) {
        this.entity.instituteOid = this.instituteList[0].oid;
      }
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });
  }

  public selectedInstitute: string;
  getInstituteInformation() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteInfoRequest.header = this.requestHeader;
    this.getInstituteInfoRequest.body = this.getInstituteInfoRequestBody;
    this.getInstituteInfoRequest.body.oid = this.entity.instituteOid;
    this._spinner.show();
    this._instituteService.getInstituteInfo(this.getInstituteInfoRequest).subscribe((data) => {
      this._spinner.hide();
      if (data.header.responseCode == "200") {
        this.gradingSystemList = data.body.gradingSystemList;
        this.sessionList = data.body.sessionList;
        this.allclassList = data.body.classList;

        console.log("-------- instiute details -------------");
        console.log(this.gradingSystemList);
        console.log(this.allclassList);

      }
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
      this._spinner.hide();
    }
    );
  }


  public selectedSessionOid: string;
  public classLevelList: InstituteClassEntity[];
  public instituteClassBySessionList: InstituteClassEntity[];
  public classList: InstituteClassEntity[];
  public getClassListBySessionRequest: GetClassListBySessionOidRequest = new GetClassListBySessionOidRequest();
  public getClassListBySessionRequestBody: GetClassListBySessionOidRequestBody = new GetClassListBySessionOidRequestBody();

  loadClassBySession() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.getClassListBySessionRequestBody.instituteSessionOid = this.entity.instituteSessionOid;
    ;
    this.getClassListBySessionRequest.header = this.requestHeader;
    this.getClassListBySessionRequest.body = this.getClassListBySessionRequestBody;
    this._spinner.show();
    this._classService.getClassListBySessionOid(this.getClassListBySessionRequest).subscribe((data) => {
      this._spinner.hide();
      this.instituteClassBySessionList = data.body.instituteClassList;
      console.log("-----------class list by session-------------");
      console.log(data.body.instituteClassLevelList);
      console.log(this.instituteClassBySessionList);
      this.classList = [];
      this.classList = this.instituteClassBySessionList;
      this.classLevelList = data.body.instituteClassLevelList;
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
      this._spinner.hide();
    });
  }


  public isShowSubjectTable: boolean = false;
  public selectedEducationTypeOid: string;
  public getSubjectListByInstituteTypeRequest: GetSubjectListByInstituteTypeRequest = new GetSubjectListByInstituteTypeRequest();
  public getSubjectListByInstituteTypeRequestBody: GetSubjectListByInstituteTypeRequestBody = new GetSubjectListByInstituteTypeRequestBody();
  public subjectListByInstituteType: SubjectByInstituteType[] = [];

  getClassSubjectListByInstituteType() {
    console.log(this.entity.instituteClassOid);
    let classObj = _.where(this.classList, { oid: this.entity.instituteClassOid });
    let classLevelObj = _.where(this.classLevelList, { oid: classObj[0].instituteClassLevelOid });
    console.log('fafdsa');
    console.log(classLevelObj[0]);
    this.selectedEducationTypeOid = classLevelObj[0].educationTypeOid;
    this.getSubjectListByInstituteTypeRequest.body = this.getSubjectListByInstituteTypeRequestBody;
    this.getSubjectListByInstituteTypeRequest.body.educationTypeOid = this.selectedEducationTypeOid;

    console.log('saveInstituteClassSubjectRequest');
    console.log(this.getSubjectListByInstituteTypeRequest);


    this._spinner.show();
    this._insituteClassSubjectService.getSubjectListByInstituteType(this.getSubjectListByInstituteTypeRequest).subscribe(data => {
      this._spinner.hide();
      this.subjectListByInstituteType = data.body.subjectListByInstituteType;
      console.log('getSubjectListByInstituteTypeRespone');
      console.log(this.subjectListByInstituteType);
      if (data.header.responseCode == "200") {
        this.getInstituteClassSubjectListByClassOid();
      } else {
        this._toastr.error('Error in load');
      }
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
      this._spinner.hide();
    });
  }


  public instituteClassSubjectListByClassOidRequest: GetInstituteClassSubjectListRequest = new GetInstituteClassSubjectListRequest();
  public instituteClassSubjectListByClassOidRequestBody: GetInstituteClassSubjectListRequestBody = new GetInstituteClassSubjectListRequestBody();
  public instituteClassSubjectList: InstituteClassSubject[] = [];

  getInstituteClassSubjectListByClassOid() {

    this.instituteClassSubjectListByClassOidRequest.body = this.instituteClassSubjectListByClassOidRequestBody;
    this.instituteClassSubjectListByClassOidRequest.body.instituteOid = this.userInfo.instituteOid;
    this.instituteClassSubjectListByClassOidRequest.body.instituteSessionOid = this.entity.instituteSessionOid;
    this.instituteClassSubjectListByClassOidRequest.body.instituteClassOid = this.entity.instituteClassOid;

    console.log('instituteClassSubjectListByClassOidRequest');
    console.log(this.instituteClassSubjectListByClassOidRequest);
    this._spinner.show();
    this._insituteClassSubjectService.getInstituteClassSubjectListByClassOid(this.instituteClassSubjectListByClassOidRequest).subscribe(data => {
      this._spinner.hide();
      this.instituteClassSubjectList = data.body.instituteClassSubjectList;

      for (var i = 0; i < this.subjectListByInstituteType.length; i++) {
        this.subjectListByInstituteType[i].checkStatus = false;
        this.subjectListByInstituteType[i].disableStatus = false;
        for (var j = 0; j < this.instituteClassSubjectList.length; j++) {
          if (this.subjectListByInstituteType[i].educationSubjectOid == this.instituteClassSubjectList[j].educationSubjectOid) {
            this.subjectListByInstituteType[i].checkStatus = true;
            this.subjectListByInstituteType[i].disableStatus = true;
          }
        }
      }
      this.isShowSubjectTable = true;

      console.log('Institute Class Subject List');
      console.log(this.instituteClassSubjectList);
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      });
  }


  selectAll: boolean
  selectAllCheckbox(selectAll: boolean) {
    if (selectAll) {
      this.subjectListByInstituteType.map(res => {
        if (!res.disableStatus) {
          res.checkStatus = true;
          this.selectAll = true;
        }
      })
    } else {
      this.subjectListByInstituteType.map(res => {
        if (!res.disableStatus) {
          res.checkStatus = false;
          this.selectAll = false;
        }

      })
    }
  }


  isValidData() {

    if (!this.entity.instituteOid) {
      this._toastr.error('Please! Select Institute!');
      this.selectSchool.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteSessionOid) {
      this._toastr.error('Please! Select Session!');
      this.selectSession.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteClassOid) {
      this._toastr.error('Please! Select Class!');
      this.selectClass.nativeElement.focus();
      return false;
    }



    return true;
  }


  saveInstituteClassSubjectRequest: CreateInsituteClassSubjectRequest = new CreateInsituteClassSubjectRequest();
  entity: CreateInsituteClassSubjectRequestBody = new CreateInsituteClassSubjectRequestBody();
  classSubjects: SaveClassSubject[] = [];

  saveInstituteClassSubject() {

    if (!this.isValidData()) {
      return;
    }
    this.saveInstituteClassSubjectRequest.body = this.entity;
    this.saveInstituteClassSubjectRequest.body.instituteOid = this.selectedInstitute;
    this.classSubjects = [];
    this.subjectListByInstituteType.forEach((element) => {
      if (element.checkStatus && !element.disableStatus) {
        let tempSubject: SaveClassSubject = new SaveClassSubject();
        tempSubject.educationSubjectOid = element.educationSubjectOid;
        // tempSubject.instituteClassGroupOid = element.;
        tempSubject.subjectCode = element.subjectCode;
        tempSubject.subjectType = element.subjectType;
        tempSubject.status = 'Active';

        this.classSubjects.push(tempSubject);
      }
    })

    this.saveInstituteClassSubjectRequest.body.classSubjects = this.classSubjects;


    this._spinner.show();
    this._insituteClassSubjectService.saveInstituteClassSubject(this.saveInstituteClassSubjectRequest).subscribe(data => {
      this._spinner.hide();
      if (data.header.responseCode == "200") {
        this._toastr.success('Subject Added Successfully!');
        this._router.navigate(['/school/class-subject/list']);
      } else {
        this._toastr.error('Error in save');
      }
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
      this._spinner.hide();
    });

  }


  goBack() {
    this._location.back();
  }

}
