import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmailRegEx, mobileNoRegEx, USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { AdmissionApplication } from 'src/app/school-erp/common/shared/model/admission/admission-application';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { AddNewTeacherService } from 'src/app/school-erp/common/shared/services/teacher/add-new-teacher.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { AddNewGuardianRequest } from 'src/app/school-erp/common/shared/request/guardian/add-new-guardian-request';
import { AddNewGuardianRequestBody } from 'src/app/school-erp/common/shared/request/guardian/add-new-guardian-request-body';
import { AppGuardianService } from 'src/app/school-erp/common/shared/services/guardian/app-guardian-service';
import { AppStudentService } from 'src/app/school-erp/common/shared/services/student/app-student.service';
import { StudentList } from 'src/app/school-erp/common/shared/model/student/student-list';
import { StudentRequestList } from 'src/app/school-erp/common/shared/request/student/student-request-list';
import { StudentRequestListBody } from 'src/app/school-erp/common/shared/request/student/student-request-list-body';
import { Student } from 'src/app/school-erp/common/shared/model/student/student';
import { StudentProfileRequest } from 'src/app/school-erp/common/shared/request/student/student-profile-request';
import { StudentProfileRequestBody } from 'src/app/school-erp/common/shared/request/student/student-profile-request-body';
import { GuardianStudent } from 'src/app/school-erp/common/shared/model/guardian/guardian-student';
import { DistrictListRequest } from 'src/app/school-erp/common/shared/request/district/district-list-request';
import { ThanaListRequest } from 'src/app/school-erp/common/shared/request/thana/thana-list-request';
import { DistrictListRequestBody } from 'src/app/school-erp/common/shared/request/district/district-list-request-body';
import { ThanaListRequestBody } from 'src/app/school-erp/common/shared/request/thana/thana-list-request-body';
import { DistrictService } from 'src/app/school-erp/common/shared/services/district/district.service';
import { DistrictList } from 'src/app/school-erp/common/shared/model/district/district-list';
import { ThanaList } from 'src/app/school-erp/common/shared/model/thana/thana-list';
import { ThanaService } from 'src/app/school-erp/common/shared/services/thana/thana.service';
import { ToastrService } from 'ngx-toastr';
import { GetInstituteInfoResponseBody } from 'src/app/school-erp/common/shared/response/institute/get-institute-info-response-body';
import { InstituteVersionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-version-entity';
import { InstituteSessionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-session-entity';
import { InstituteShiftEntity } from 'src/app/school-erp/common/shared/model/institute/institute-shift-entity';
import { InstituteClassEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-entity';
import { InstituteClassGroupEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-group-entity';
import { InstituteClassSectionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-section-entity';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { AppClassGroupService } from 'src/app/school-erp/common/shared/services/class-group/app-class-group.service';
import { ConstantService } from 'src/app/common/services/constant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassGroupListByClassSessionRequestBody } from 'src/app/school-erp/common/shared/request/class-group/class-group-list-by-class-session-request-body';
import { EducationTypeEntity } from 'src/app/school-erp/common/shared/model/education/education-type-entity';
import { ClassGroupDetails } from 'src/app/school-erp/common/shared/model/class-group/class-group-details';
import { ClassGroupListByClassSessionRequest } from 'src/app/school-erp/common/shared/request/class-group/class-group-list-by-class-session-request';
import { NgxSpinnerConfiguration } from 'src/app/school-erp/common/shared/model/ngx-spinner-configuration';
import { DropdownData } from 'src/app/common/constant/dropdown-data';
import { bloodGroupList, religionList } from 'src/app/common/constant/list-status';
import { Location } from '@angular/common';
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';
import { InstituteListRequest } from 'src/app/school-erp/common/shared/request/institute/institute-list-request';
import { InstituteListRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-list-request-body';
import { GetClassListBySessionOidRequest } from 'src/app/school-erp/common/shared/request/class/get-class-list-by-session-oid-request';
import { GetClassListBySessionOidRequestBody } from 'src/app/school-erp/common/shared/request/class/get-class-list-by-session-oid-request-body';
import { ClassService } from 'src/app/school-erp/common/shared/services/class/class.service';
import { ImageUploadResponse } from 'src/app/school-erp/common/shared/response/teacher/imageUploadResponse';
@Component({
  selector: 'app-admin-guardian-add',
  templateUrl: './admin-guardian-add.component.html',
  styleUrls: ['./admin-guardian-add.component.scss']
})
export class AdminGuardianAddComponent implements OnInit {

  constructor(
    private _addNewGuardianService: AppGuardianService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _uploadPhoto: AddNewTeacherService,
    private _classGroupService: AppClassGroupService,
    private _constantService: ConstantService,
    private _districtService: DistrictService,
    private _thanaService: ThanaService,
    private _instituteService: InstituteService,
    private _studentListService: AppStudentService,
    private _appStorageService: AppStorageService,
    private _spinner: NgxSpinnerService,
    private _location: Location,
    private classService: ClassService,
  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }

  spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();

  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();
  public userInfo: UserInfo = new UserInfo();
  public locale: any;
  public entity: AdmissionApplication = new AdmissionApplication;
  public isAddressSameAsChecked = true;
  public isShowForm = true;
  public isShowSuccessMsg = false;
  public admissionId: string;
  public isShowNotificationMessage: boolean;
  public isShowNotificationMessageStudentList: boolean;
  public notificationMessage: string;
  public notificationDelay: number = 7000;
  public notificationType: string;

  public religionList: DropdownData[] = religionList;
  public bloodGroupList: DropdownData[] = bloodGroupList;

  public mobileNoPattern = mobileNoRegEx;
  public emailPattern = EmailRegEx;

  public tempData = [];

  @ViewChild('guardianNameBn') guardianNameBn: any;
  @ViewChild('selectSchool') selectSchool: any;
  @ViewChild('studentId') studentId: any;
  @ViewChild('selectClass') selectClass: any;
  @ViewChild('session') session: any;
  @ViewChild('selectVersion') selectVersion: any;
  @ViewChild('selectShift') selectShift: any;
  @ViewChild('guardianNameEn') guardianNameEn: any;
  @ViewChild('dateOfBirth') dateOfBirth: any;
  @ViewChild('email') email: any;
  @ViewChild('loginId') loginId: any;
  @ViewChild('uploadImage') uploadImage: any;
  @ViewChild('mobileNo') mobileNo: any;
  @ViewChild('emergencyContactNumber') emergencyContactNumber: any;
  @ViewChild('gender') gender: any;
  @ViewChild('religion') religion: any;
  @ViewChild('educationalQualification') educationalQualification: any;
  @ViewChild('nationality') nationality: any;
  @ViewChild('applicantNationality') applicantNationality: any;
  @ViewChild('mobileNoPersonal') mobileNoPersonal: any;
  @ViewChild('permanentAddressCareOf') permanentAddressCareOf: any;
  @ViewChild('permanentAddressHouseNo') permanentAddressHouseNo: any;
  @ViewChild('permanentAddressRoadNo') permanentAddressRoadNo: any;
  @ViewChild('permanentAddressThana') permanentAddressThana: any;
  @ViewChild('permanentAddressZzilla') permanentAddressZzilla: any;
  @ViewChild('presentAddressCareOf') presentAddressCareOf: any;
  @ViewChild('presentAddressHouseNo') presentAddressHouseNo: any;
  @ViewChild('presentAddressRoadNo') presentAddressRoadNo: any;
  @ViewChild('presentAddressThana') presentAddressThana: any;
  @ViewChild('presentAddressZzilla') presentAddressZzilla: any;
  @ViewChild('fatherNameBn') fatherNameBn: any;
  @ViewChild('fatherNameEn') fatherNameEn: any;
  @ViewChild('fatherOccupation') fatherOccupation: any;
  @ViewChild('fatherContactNumber') fatherContactNumber: any;
  @ViewChild('fatherEmail') fatherEmail: any;
  @ViewChild('motherNameBn') motherNameBn: any;
  @ViewChild('motherNameEn') motherNameEn: any;
  @ViewChild('motherOccupation') motherOccupation: any;
  @ViewChild('motherContactNumber') motherContactNumber: any;
  @ViewChild('motherEmail') motherEmail: any;
  @ViewChild('permanentAddressPostOffice') permanentAddressPostOffice: any;
  @ViewChild('permanentAddressPostcode') permanentAddressPostcode: any;
  @ViewChild('permanentAddressUpzilla') permanentAddressUpzilla: any;
  @ViewChild('permanentAddressZilla') permanentAddressZilla: any;
  @ViewChild('presentAddressPostOffice') presentAddressPostOffice: any;
  @ViewChild('presentAddressPostcode') presentAddressPostcode: any;
  @ViewChild('presentAddressUpzilla') presentAddressUpzilla: any;
  @ViewChild('presentAddressZilla') presentAddressZilla: any;
  @ViewChild('applicantProfession') applicantProfession: any;


  ngOnInit(): void {
    this.locale = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    });
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.addNewGuardianRequestBody.nationality = 'Bangladeshi'
    this.getDistrictList();
    this.getThanaList();
    this.tempData = [];

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

    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });
  }




  getDistrictList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.districtListRequest.header = this.requestHeader;
    this.districtListRequest.body = new DistrictListRequestBody();

    this._districtService.getDistrictList(this.districtListRequest).subscribe((data) => {
      this.districtList = data.body.districtList;
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });
  }

  getThanaList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.thanaListRequest.header = this.requestHeader;
    this.thanaListRequest.body = new ThanaListRequestBody();

    this._thanaService.getThanaList(this.thanaListRequest).subscribe((data) => {
      this.thanaList = data.body.thanaList;
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });
  }


  loadPresentAdressThana() {
    this.presentThanaList = [];
    this.entity.presentAddress.thanaOid = null;
    this.presentThanaList = _.where(this.thanaList, { districtOid: this.addNewGuardianRequestBody.presentAddress.districtOid });

  }

  loadPermanentAdressThana() {
    this.permanentThanaList = [];
    this.entity.permanentAddress.thanaOid = null;
    this.permanentThanaList = _.where(this.thanaList, { districtOid: this.addNewGuardianRequestBody.permanentAddress.districtOid });
  }



  public selectedInstitute: string;
  getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();

  public isShowSelectVersion: boolean = false;
  public isShowSelectShift: boolean = false;
  public instituteInfo: GetInstituteInfoResponseBody = new GetInstituteInfoResponseBody();
  public versionList: InstituteVersionEntity[];
  public sessionList: InstituteSessionEntity[];
  public shiftList: InstituteShiftEntity[];
  public classList: InstituteClassEntity[];
  public groupList: InstituteClassGroupEntity[];
  public sectionList: InstituteClassSectionEntity[];
  getInstituteInformation() {

    this.selectedVersion = null;
    this.selectedShift = null;
    this.selectedClass = null;
    this.selectedClassGroup = null;
    this.selectedClassSection = null;
    this.isShowClassGroup = false;
    this.isShowSection = false;
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteInfoRequest.header = this.requestHeader;
    this.getInstituteInfoRequest.body = this.getInstituteInfoRequestBody;
    this.getInstituteInfoRequest.body.oid = this.selectedInstitute;

    this._instituteService.getInstituteInfo(this.getInstituteInfoRequest).subscribe((data) => {
      if (data.header.responseCode == "200") {
        console.log("institute information ------------------------");
        console.log(data.body);


        this.instituteInfo = data.body;
        this.versionList = data.body.versionList;
        this.sessionList = data.body.sessionList;
        this.shiftList = data.body.shiftList;
        this.classList = data.body.classList;
        if (this.sessionList.length == 1) {
          this.selectedSession = this.sessionList[0].oid;
        }
        if (this.versionList.length == 1) {
          this.selectedVersion = this.versionList[0].oid;
          this.isShowSelectVersion = false;
        } else {
          this.isShowSelectVersion = true;
        }
        if (this.shiftList.length == 1) {
          this.selectedShift = this.shiftList[0].oid;
          this.isShowSelectShift = false;
        } else {
          this.isShowSelectShift = true;
        }
      }
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    }
    );
  }


  public selectedVersion: string;
  public selectedSession: string;
  public selectedShift: string;
  public selectedClass: string;
  public selectedClassGroup: string;
  public selectedClassSection: string;



  public enableSearchButton: boolean = false;
  public classGroupListByClassSessionRequest: ClassGroupListByClassSessionRequest = new ClassGroupListByClassSessionRequest();
  public classGroupListByClassSessionRequestBody: ClassGroupListByClassSessionRequestBody = new ClassGroupListByClassSessionRequestBody();



  // loadClassBySession(instituteSessionOid: string) {

  //   if (!this._constantService.isNullOrEmpty(instituteSessionOid)) {
  //     this.enableSearchButton = true;
  //   } else {
  //     this.enableSearchButton = false;
  //   }
  //   this.selectedClass = null;
  //   this.selectedClassGroup = null;
  //   this.selectedClassSection = null;
  //   this.isShowClassGroup = false;
  //   this.isShowSection = false;
  //   var session: InstituteSessionEntity = new InstituteSessionEntity();
  //   session = _.where(this.sessionList, { oid: instituteSessionOid });
  //   var eduTypeList: EducationTypeEntity[] = JSON.parse(session[0].educationTypeJson);
  //   this.classList = [];
  //   this.classList = this.instituteInfo.classList.filter(classObj => eduTypeList.map(eduType => eduType.oid).includes(classObj.educationTypeOid));
  // }

  public getClassListBySessionRequest: GetClassListBySessionOidRequest = new GetClassListBySessionOidRequest();
  public getClassListBySessionRequestBody: GetClassListBySessionOidRequestBody = new GetClassListBySessionOidRequestBody();
  loadClassBySession(instituteSessionOid: string) {
    if (!this._constantService.isNullOrEmpty(instituteSessionOid)) {
      this.enableSearchButton = true;
    } else {
      this.enableSearchButton = false;
    }
    this.selectedClass = null;
    this.selectedClassGroup = null;
    this.selectedClassSection = null;
    this.isShowClassGroup = false;
    this.isShowSection = false;
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.getClassListBySessionRequestBody.instituteSessionOid = instituteSessionOid;
    this.getClassListBySessionRequest.header = this.requestHeader;
    this.getClassListBySessionRequest.body = this.getClassListBySessionRequestBody;

    this.classService.getClassListBySessionOid(this.getClassListBySessionRequest).subscribe((data) => {
      // this.instituteClassBySessionList = data.body.instituteClassList;
      // console.log("-----------class list by session-------------");
      // console.log(data.body.instituteClassLevelList);
      // console.log(this.instituteClassBySessionList);
      this.entity.instituteClassOid = undefined;
      this.classList = [];
      this.classList = data.body.instituteClassList;
    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });
  }

  getSectionList() {
    this.sectionList = [];
    if (this.classGroupList.length > 0) {
      this.isShowClassGroup = true;
      if (!this._constantService.isNullOrEmpty(this.selectedClassGroup)) {
        this.sectionList = _.where(this.instituteInfo.sectionList, {
          instituteSessionOid: this.selectedSession,
          instituteShiftOid: this.selectedShift,
          instituteVersionOid: this.selectedVersion,
          instituteClassOid: this.selectedClass,
          instituteClassGroupOid: this.selectedClassGroup
        });

      } else {
        this.sectionList = _.where(this.instituteInfo.sectionList, {
          instituteSessionOid: this.selectedSession,
          instituteShiftOid: this.selectedShift,
          instituteVersionOid: this.selectedVersion,
          instituteClassOid: this.selectedClass
        });
      }
    } else {
      this.selectedClassGroup = null;
      this.isShowClassGroup = false;
      this.sectionList = _.where(this.instituteInfo.sectionList, {
        instituteSessionOid: this.selectedSession,
        instituteShiftOid: this.selectedShift,
        instituteVersionOid: this.selectedVersion,
        instituteClassOid: this.selectedClass
      });

    }
    if (this.sectionList.length == 1) {
      this.selectedClassSection = this.sectionList[0].oid;
      this.isShowSection = false;
    } else if (this.sectionList.length == 0) {
      this.selectedClassSection = null;
      this.isShowSection = false;
    }
    else {
      this.isShowSection = true;
    }
  }


  public classGroupList: ClassGroupDetails[];
  public isShowClassGroup: boolean = false;
  loadClassGroup() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.classGroupListByClassSessionRequest.header = this.requestHeader;
    this.classGroupListByClassSessionRequestBody.instituteOid = this.selectedInstitute;
    this.classGroupListByClassSessionRequestBody.sessionOid = this.selectedSession;
    this.classGroupListByClassSessionRequestBody.classOid = this.selectedClass;
    this.classGroupListByClassSessionRequest.body = this.classGroupListByClassSessionRequestBody;

    console.log("Get Class Group List Request : ");
    console.log(this.classGroupListByClassSessionRequest);

    this._classGroupService.getClassGroupByClassSessionList(this.classGroupListByClassSessionRequest).subscribe((data) => {
      console.log("Get Institute List Response : ");
      console.log(data);
      this.classGroupList = data.body.classGroupList;
      console.log(this.classGroupList);
      if (this.classGroupList.length == 1) {
        this.selectedClassGroup = this.classGroupList[0].oid.toString();
        this.isShowClassGroup = true;
      }

      this.getSectionList();

    }, (error) => {
      console.log(error);
      this._toastr.error(error.Message);
    });

  }


  public isShowSection: boolean = false;
  loadSectionData(triger: string) {
    if (triger == 'class') {
      this.selectedClassSection = null;
    }
    console.log(this.instituteInfo.sectionList);
    if (!this._constantService.isNullOrEmpty(this.selectedSession) &&
      !this._constantService.isNullOrEmpty(this.selectedShift) &&
      !this._constantService.isNullOrEmpty(this.selectedVersion) &&
      !this._constantService.isNullOrEmpty(this.selectedClass)) {


      this.loadClassGroup();

    } else {


      this.sectionList = [];
      this.isShowSection = false;
      this.selectedClassGroup = null;
    }
  }


  public isShowSelectChild: boolean = false;
  public studentList: StudentList[];

  public studentListRequest: StudentRequestList = new StudentRequestList();
  public studentListHeader: RequestHeader = new RequestHeader();
  public studentListBody: StudentRequestListBody = new StudentRequestListBody();

  getStudentList() {

    this.studentListHeader.requestId = this.header.requestId;
    this.studentListHeader.requestDateTime = this.header.requestDateTime;
    this.studentListHeader.requestSource = this.header.requestSource;
    this.studentListHeader.requestServiceSource = this.header.requestServiceSource;

    this.studentListBody.instituteOid = this.selectedInstitute;
    this.studentListBody.instituteSessionOid = this.selectedSession;
    this.studentListBody.instituteVersionOid = this.selectedVersion;
    this.studentListBody.instituteShiftOid = this.selectedShift;
    this.studentListBody.instituteClassOid = this.selectedClass;
    this.studentListBody.instituteClassGroupOid = this.selectedClassGroup;
    this.studentListBody.sectionOid = this.selectedClassSection;

    this.studentListRequest.header = this.studentListHeader;
    this.studentListRequest.body = this.studentListBody;
    console.log("Student list Request body :");
    console.log(this.studentListRequest);

    this._spinner.show();
    this._studentListService.getStudentList(this.studentListRequest).subscribe(data => {
      this._spinner.hide();
      console.log('student list');
      console.log(data.body.studentList);
      this.studentList = data.body.studentList;
      if (this.studentList.length < 1) {
        this.notificationType = 'danger';
        this.isShowNotificationMessageStudentList = true;
        this.notificationMessage = "No Data Found";
        if (this.tempData.length < 1) {
          this.isShowSelectChild = false;
        } else {
          this.isShowSelectChild = true;
        }
        setTimeout(() => {
          this.isShowNotificationMessageStudentList = false;
        }, this.notificationDelay);
      } else {
        this.isShowNotificationMessageStudentList = false;
        this.isShowSelectChild = true;
      }


    }, error => this._spinner.hide());


  }

  public districtListRequest: DistrictListRequest = new DistrictListRequest();
  public thanaListRequest: ThanaListRequest = new ThanaListRequest();


  public districtList: DistrictList[];
  public thanaList: ThanaList[];
  public presentThanaList: ThanaList[];
  public permanentThanaList: ThanaList[];

  public isShowChildTable: boolean = false;
  public entityByStudentId: Student = new Student();
  public studentProfileRequest: StudentProfileRequest = new StudentProfileRequest();
  public studentProfileRequestBody: StudentProfileRequestBody = new StudentProfileRequestBody();

  getStudentProfileInfo(selectedStudentId: any) {
    debugger
    if (!this._constantService.isNullOrEmpty(selectedStudentId)) {
      this.requestHeader.requestId = this.header.requestId;
      this.requestHeader.requestDateTime = this.header.requestDateTime;
      this.requestHeader.requestSource = this.header.requestSource;
      this.requestHeader.requestServiceSource = this.header.requestServiceSource;

      this.studentProfileRequest.header = this.requestHeader;
      this.studentProfileRequest.body = this.studentProfileRequestBody;
      this.studentProfileRequest.body.studentId = selectedStudentId;

      this._studentListService.getStudentProfileInfo(this.studentProfileRequest).subscribe(data => {
        debugger
        this.entityByStudentId = data.body;
        console.log('selected student');
        console.log(data.body);

        let allowStudentObjPush: boolean = true;
        if (this.tempData.length > 0) {
          let i;
          for (i = 0; i < this.tempData.length; i++) {
            if (this.tempData[i].oid == data.body.oid) {
              allowStudentObjPush = false;
              this._toastr.error('Already Added Student in the List');
              break;
            } else {
              allowStudentObjPush = true;
            }
          }
          // this.tempData.forEach((element) => {
          //   debugger
          //   console.log('element oid');
          //   console.log(element.oid);
          //   console.log(data.body.oid);



          //   if (element.oid == data.body.oid) {
          //     debugger
          //     allowStudentObjPush = false;
          //     this._toastr.error('Already Added Student in the List');
          //     return false;
          //   } else {
          //     debugger
          //     allowStudentObjPush = true;
          //   }
          //   if (!allowStudentObjPush) return false;
          // })
        }


        if (allowStudentObjPush) {
          this.tempData.push(data.body);
          this.isShowChildTable = true;
        }

      },
        (error) => {
          console.log(error);
        });
    }


  }

  removeStudent(thisIndex: any) {
    this.tempData.splice(thisIndex, 1);
    if (this.tempData.length < 1) {
      this.isShowChildTable = false;
    } else {
      this.isShowChildTable = true;
    }
  }

  changeAddressSelection(isChecked: boolean) {
    this.isAddressSameAsChecked = !isChecked;

    if (isChecked === undefined) {
      return;
    }

    if (isChecked) {
      this.addNewGuardianRequestBody.permanentAddress.careOf = this.addNewGuardianRequestBody.presentAddress.careOf;
      this.addNewGuardianRequestBody.permanentAddress.houseNo = this.addNewGuardianRequestBody.presentAddress.houseNo;
      this.addNewGuardianRequestBody.permanentAddress.roadNo = this.addNewGuardianRequestBody.presentAddress.roadNo;
      this.addNewGuardianRequestBody.permanentAddress.villageOrWord = this.addNewGuardianRequestBody.presentAddress.villageOrWord;
      this.addNewGuardianRequestBody.permanentAddress.postOffice = this.addNewGuardianRequestBody.presentAddress.postOffice;
      this.addNewGuardianRequestBody.permanentAddress.postcode = this.addNewGuardianRequestBody.presentAddress.postcode;
      this.addNewGuardianRequestBody.permanentAddress.thana = this.addNewGuardianRequestBody.presentAddress.thana;
      this.addNewGuardianRequestBody.permanentAddress.thanaOid = this.addNewGuardianRequestBody.presentAddress.thanaOid;
      this.addNewGuardianRequestBody.permanentAddress.district = this.addNewGuardianRequestBody.presentAddress.district;
      this.addNewGuardianRequestBody.permanentAddress.districtOid = this.addNewGuardianRequestBody.presentAddress.districtOid;
      this.permanentThanaList = this.presentThanaList;
    } else {
      this.addNewGuardianRequestBody.permanentAddress.careOf = '';
      this.addNewGuardianRequestBody.permanentAddress.houseNo = '';
      this.addNewGuardianRequestBody.permanentAddress.roadNo = '';
      this.addNewGuardianRequestBody.permanentAddress.villageOrWord = '';
      this.addNewGuardianRequestBody.permanentAddress.postOffice = '';
      this.addNewGuardianRequestBody.permanentAddress.postcode = '';
      this.addNewGuardianRequestBody.permanentAddress.thana = '';
      this.addNewGuardianRequestBody.permanentAddress.thanaOid = null;
      this.addNewGuardianRequestBody.permanentAddress.district = '';
      this.addNewGuardianRequestBody.permanentAddress.districtOid = null;
      this.permanentThanaList = [];
    }

    // if (isChecked) {
    //   this.addNewGuardianRequestBody.permanentAddress.careOf = this.addNewGuardianRequestBody.presentAddress.careOf;
    //   this.addNewGuardianRequestBody.permanentAddress.houseNo = this.addNewGuardianRequestBody.presentAddress.houseNo;
    //   this.addNewGuardianRequestBody.permanentAddress.roadNo = this.addNewGuardianRequestBody.presentAddress.roadNo;
    //   this.addNewGuardianRequestBody.permanentAddress.villageOrWord = this.addNewGuardianRequestBody.presentAddress.villageOrWord;
    //   this.addNewGuardianRequestBody.permanentAddress.postOffice = this.addNewGuardianRequestBody.presentAddress.postOffice;
    //   this.addNewGuardianRequestBody.permanentAddress.postcode = this.addNewGuardianRequestBody.presentAddress.postcode;
    //   this.addNewGuardianRequestBody.permanentAddress.thana = this.addNewGuardianRequestBody.presentAddress.thana;
    //   this.addNewGuardianRequestBody.permanentAddress.district = this.addNewGuardianRequestBody.presentAddress.district;
    // } else {
    //   this.addNewGuardianRequestBody.permanentAddress.careOf = '';
    //   this.addNewGuardianRequestBody.permanentAddress.houseNo = '';
    //   this.addNewGuardianRequestBody.permanentAddress.roadNo = '';
    //   this.addNewGuardianRequestBody.permanentAddress.villageOrWord = '';
    //   this.addNewGuardianRequestBody.permanentAddress.postOffice = '';
    //   this.addNewGuardianRequestBody.permanentAddress.postcode = '';
    //   this.addNewGuardianRequestBody.permanentAddress.thana = '';
    //   this.addNewGuardianRequestBody.permanentAddress.district = '';
    // }
  }

  public url: any;
  public imageSet: string;
  public applicantPhoto: any = File;
  public isShowPhotoResizeLink: boolean;
  onSelect(event) {
    let img = new Image();
    let fileSize = parseInt(((event.target.files[0].size) / 1000).toFixed(0));
    let fileType = event.target.files[0].type;

    console.log('FILE SIZE');
    console.log(fileType);

    if (fileType == 'image/jpeg' || fileType == 'image/png') {
      img.src = window.URL.createObjectURL(event.target.files[0])
      img.onload = () => {
        if (img.width == 300 && img.height == 300 && fileSize <= 50) {
          this.notificationType = 'success';
          this.isShowNotificationMessage = true;
          this.isShowPhotoResizeLink = false;
          this.locale == 'en' ? this.notificationMessage = "Image selected with required Type and Size"
            : this.notificationMessage = "সঠিক সাইজ ও ফরমেটের ছবি নির্বাচন করা হয়েছে।";
          setTimeout(() => {
            this.isShowNotificationMessage = false;
          }, this.notificationDelay);
          if (event.target.files && event.target.files[0]) {

            const file = event.target.files[0]

            this.applicantPhoto = file;

            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event) => {
              this.url = event.target.result;
              this.fileUpload();
            }
          }
        }
        else if (img.width == 300 && img.height == 300 && fileSize > 50) {
          this.url = null;
          this.notificationType = 'danger';
          this.isShowNotificationMessage = true;
          this.isShowPhotoResizeLink = true;
          this.locale == 'en' ? this.notificationMessage = `Sorry, we require maximum of 50kb image but your image is 
           ${fileSize}kb. Resize the image from` : this.notificationMessage = `দুঃখিত। ছবিটি ৫০ কিলোবাইট অতিক্রম করেছে। আপনার ছবিটির সাইজ 
           ${fileSize} কিলোবাইট। রিসাইজ করুন`;

        }
        else if ((img.width != 300 || img.height != 300) && (fileSize <= 50)) {
          this.url = null;
          this.notificationType = 'danger';
          this.isShowNotificationMessage = true;
          this.isShowPhotoResizeLink = true;
          this.locale == 'en' ?
            this.notificationMessage = `Sorry, we require 300 x 300 pixels image but your image is ${img.width} x ${img.height} pixels . Resize the image from `
            : this.notificationMessage = `দুঃখিত। ছবিটি ৩০০ x ৩০০ পিক্সেলের নয়। আপনার ছবিটি  ${img.width} x ${img.height} পিক্সেলের। অনুগ্রহ করে রিসাইজ করুন `;

        }
        else if ((img.width != 300 || img.height != 300) && fileSize > 50) {
          this.url = null;
          this.notificationType = 'danger';
          this.isShowNotificationMessage = true;
          this.isShowPhotoResizeLink = true;
          this.locale == 'en' ? this.notificationMessage = `Sorry, we require 300 x 300 pixels(maximum of 50kb) image but your image is
          ${img.width} x ${img.height} pixels with file size  ${fileSize}kb.
           Resize the image from `
            : this.notificationMessage = `দুঃখিত। ছবিটি ৩০০ x ৩০০(সর্বোচ্চ ৫০ কিলোবাইট) পিক্সেলের নয়। আপনার ছবিটি
          ${img.width} x ${img.height} পিক্সেলের এবং ফাইল সাইজ ${fileSize}কিলোবাইট।
           অনুগ্রহ করে রিসাইজ করুন`;
        }

      }
    } else {
      this.url = null;
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;
      this.isShowPhotoResizeLink = false;
      this.locale == 'en' ? this.notificationMessage = `Wrong file format!!! Please Select JPEG/PNG file.`
        : this.notificationMessage = `ফাইল ফরমেট ভুল। অনুগ্রহ করে JPEG/PNG ফাইল ফরমেট নির্বাচন করুন। `;
    }

  }

  public imageUploadResponse: ImageUploadResponse = new ImageUploadResponse();
  fileUpload() {
    const formData = new FormData();
    formData.append('file', this.applicantPhoto)

    this._spinner.show();
    this._uploadPhoto.uploadImage(formData).subscribe((data) => {
      this._spinner.hide();
      this.imageUploadResponse = data;
      this.addNewGuardianRequestBody.photoUrl = environment.uploadImageUrl + data.name;
      this.addNewGuardianRequestBody.photoPath = data.url + "/" + data.name;

    }, (error) => {
      console.log(error);
      this._spinner.hide();
      this._toastr.error(error.Message);
    });
  }


  isValidData() {
    if (!this.addNewGuardianRequestBody.guardianNameBn) {
      this._toastr.error('Please! Check Name in Bangla');
      this.guardianNameBn.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.guardianNameEn) {
      this._toastr.error('Please! Check Name in English');
      this.guardianNameEn.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.dateOfBirth) {
      this._toastr.error('Please! Check Date of Birth');
      this.dateOfBirth.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.gender) {
      this._toastr.error('Please! Check Ggender');
      this.gender.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.religion) {
      this._toastr.error('Please! Check Religion');
      this.religion.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.nationality) {
      this._toastr.error('Please! Check Nationality');
      this.nationality.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.educationalQualification) {
      this._toastr.error('Please! Check Educational Qualification');
      this.educationalQualification.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.photoUrl) {
      this._toastr.error('Please! Upload Photo');
      this.uploadImage.nativeElement.focus();
      return false;
    }
    if (this.addNewGuardianRequestBody.mobileNo) {
      if (!this.addNewGuardianRequestBody.mobileNo.match(this.mobileNoPattern)) {
        this._toastr.error('Please! Enter valid Phone Number');
        this.mobileNo.nativeElement.focus();
        return false;
      }
    } else if (!this.addNewGuardianRequestBody.mobileNo) {
      this._toastr.error('Please! Check Mobile No');
      this.mobileNo.nativeElement.focus();
      return false;
    }
    if (this.addNewGuardianRequestBody.emergencyContactNo) {
      if (!this.addNewGuardianRequestBody.emergencyContactNo.match(this.mobileNoPattern)) {
        this._toastr.error('Please! Enter valid Emergency Phone Number');
        this.emergencyContactNumber.nativeElement.focus();
        return false;
      }
    }
    if (this.addNewGuardianRequestBody.email) {
      if (!this.addNewGuardianRequestBody.email.match(this.emailPattern)) {
        this._toastr.error('Please! Enter valid Email');
        this.email.nativeElement.focus();
        return false;
      }
    }
    if (!this.addNewGuardianRequestBody.loginId) {
      this._toastr.error('Please! Check Login ID');
      this.loginId.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.presentAddress.careOf) {
      this._toastr.error('Please! Check Care of');
      this.presentAddressCareOf.nativeElement.focus();
      return false;
    }

    if (!this.addNewGuardianRequestBody.presentAddress.houseNo) {
      this._toastr.error('Please! Check House No.');
      this.presentAddressHouseNo.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.presentAddress.roadNo) {
      this._toastr.error('Please! Check Road No.');
      this.presentAddressRoadNo.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.presentAddress.district) {
      this._toastr.error('Please! Check District');
      this.presentAddressZzilla.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.presentAddress.thana) {
      this._toastr.error('Please! Check Thana');
      this.presentAddressThana.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.permanentAddress.careOf) {
      this._toastr.error('Please! Check Care of');
      this.permanentAddressCareOf.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.permanentAddress.houseNo) {
      this._toastr.error('Please! Check House No.');
      this.permanentAddressHouseNo.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.permanentAddress.roadNo) {
      this._toastr.error('Please! Check Road No.');
      this.permanentAddressRoadNo.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.permanentAddress.district) {
      this._toastr.error('Please! Check District');
      this.permanentAddressZzilla.nativeElement.focus();
      return false;
    }
    if (!this.addNewGuardianRequestBody.permanentAddress.thana) {
      this._toastr.error('Please! Check Thana');
      this.permanentAddressThana.nativeElement.focus();
      return false;
    }


    return true;
  }

  addNewGuardianRequest: AddNewGuardianRequest = new AddNewGuardianRequest();
  addNewGuardianRequestBody: AddNewGuardianRequestBody = new AddNewGuardianRequestBody();
  checkAndSubmitApplication() {
    debugger
    this.addNewGuardianRequest.body = this.addNewGuardianRequestBody;
    this.addNewGuardianRequest.body.createdBy = this.userInfo.loginId;
    this.addNewGuardianRequest.body.instituteOid = this.userInfo.instituteOid;

    var presentDistrict = _.where(this.districtList, { oid: this.addNewGuardianRequestBody.presentAddress.districtOid });
    var presentThana = _.where(this.thanaList, { oid: this.addNewGuardianRequestBody.presentAddress.thanaOid });
    var permanentDistrict = _.where(this.districtList, { oid: this.addNewGuardianRequestBody.permanentAddress.districtOid });
    var permanentThana = _.where(this.thanaList, { oid: this.addNewGuardianRequestBody.permanentAddress.thanaOid });

    if (presentDistrict != "")
      this.addNewGuardianRequestBody.presentAddress.district = presentDistrict[0].nameEn;

    if (presentThana != "")
      this.addNewGuardianRequestBody.presentAddress.thana = presentThana[0].nameEn;

    if (permanentDistrict != "")
      this.addNewGuardianRequestBody.permanentAddress.district = permanentDistrict[0].nameEn;

    if (permanentThana != "")
      this.addNewGuardianRequestBody.permanentAddress.thana = permanentThana[0].nameEn;

    if (!this.isValidData()) {
      return;
    }

    for (let i = 0; i < this.tempData.length; i++) {
      let guardianStudent: GuardianStudent = new GuardianStudent();
      guardianStudent.studentId = this.tempData[i].studentId;
      guardianStudent.studentOid = this.tempData[i].oid;
      this.addNewGuardianRequest.body.studentList.push(guardianStudent);
    }
    if (this.addNewGuardianRequestBody.studentList.length < 1) {
      this._toastr.error('Please! Add Student Information!');
      return false;
    }
    if (this.addNewGuardianRequestBody != null) {
      this._addNewGuardianService.saveGuardian(this.addNewGuardianRequest).subscribe(resData => {
        if (resData.header.responseCode == '200') {
          this.isShowForm = false;
          this.isShowSuccessMsg = true;
        } else {
          this._toastr.error((resData.header.message).toString());
        }
      },
        (error) => {
          console.log(error);
          this._spinner.hide();
          this._toastr.error(error.Message);
        });
    }
  }



  goBack() {
    this._location.back();
  }

}
