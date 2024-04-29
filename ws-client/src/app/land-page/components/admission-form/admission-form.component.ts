import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EmailRegEx, mobileNoRegEx } from 'src/app/common/constant/constant';
import { DropdownData } from 'src/app/common/constant/dropdown-data';
import { bloodGroupList, religionList } from 'src/app/common/constant/list-status';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ClassGroupDetails } from 'src/app/school-erp/common/shared/model/class-group/class-group-details';
import { DataList } from 'src/app/school-erp/common/shared/model/common/data-list';
import { DistrictList } from 'src/app/school-erp/common/shared/model/district/district-list';
import { InstituteClassEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-entity';
import { InstituteList } from 'src/app/school-erp/common/shared/model/institute/institute-list';
import { ThanaList } from 'src/app/school-erp/common/shared/model/thana/thana-list';
import { ClassGroupListByClassSessionRequest } from 'src/app/school-erp/common/shared/request/class-group/class-group-list-by-class-session-request';
import { ClassGroupListByClassSessionRequestBody } from 'src/app/school-erp/common/shared/request/class-group/class-group-list-by-class-session-request-body';
import { GetClassListBySessionOidRequest } from 'src/app/school-erp/common/shared/request/class/get-class-list-by-session-oid-request';
import { GetClassListBySessionOidRequestBody } from 'src/app/school-erp/common/shared/request/class/get-class-list-by-session-oid-request-body';
import { DistrictListRequest } from 'src/app/school-erp/common/shared/request/district/district-list-request';
import { DistrictListRequestBody } from 'src/app/school-erp/common/shared/request/district/district-list-request-body';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { InstituteListRequest } from 'src/app/school-erp/common/shared/request/institute/institute-list-request';
import { InstituteListRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-list-request-body';
import { ThanaListRequest } from 'src/app/school-erp/common/shared/request/thana/thana-list-request';
import { ThanaListRequestBody } from 'src/app/school-erp/common/shared/request/thana/thana-list-request-body';
import { GetInstituteInfoResponseBody } from 'src/app/school-erp/common/shared/response/institute/get-institute-info-response-body';
import { AppClassGroupService } from 'src/app/school-erp/common/shared/services/class-group/app-class-group.service';
import { ClassService } from 'src/app/school-erp/common/shared/services/class/class.service';
import { DistrictService } from 'src/app/school-erp/common/shared/services/district/district.service';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { ThanaService } from 'src/app/school-erp/common/shared/services/thana/thana.service';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { AdmissionFormRequest } from './model/admission-form-request';
import { AdmissionFormRequestBody } from './model/admission-form-request-body';
import { AdmissionFormService } from './service/admission-form.service';
import { NgxImageCompressService } from 'ngx-alldone-image-compress';
import { BANGLA_REGEX, EMAIL_REGEX, MOBILE_NO_REGEX_V2, NAME_REGEX, NUMBER_REGEX, POST_CODE_REGEX } from 'src/app/common/constant/reg-constant';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})
export class AdmissionFormComponent implements OnInit {
  religionList: DropdownData[] = religionList;
  bloodGroupList: DropdownData[] = bloodGroupList;

  public minDateOfBirth: Date;
  public maxDateOfBirth: Date;
  public isAddressSameAsChecked = true;
  public isShowForm = true;
  public isShowSuccessMsg = false;
  public admissionId: string;

  public isShowNotificationMessage: boolean;
  public notificationMessage: string;
  public notificationDelay: number = 5000;
  public notificationType: string;
  public isShowPhotoResizeLink: boolean;


  public locale: any;
  public instituteName: string;
  public instituteLogoUrl: string;

  public isShowClassGroup: boolean = false;
  public instituteList: InstituteList[];
  public shiftList: DataList[];
  public classList: InstituteClassEntity[];
  public classLevelList: DataList[];
  public sessionList: DataList[];
  public versionList: DataList[];

  public instituteClassBySessionList: InstituteClassEntity[];
  public classGroupList: ClassGroupDetails[];

  public mobileNoPattern = mobileNoRegEx;
  public emailPattern = EmailRegEx;

  public namePattern = NAME_REGEX;
  public banglaPattern = BANGLA_REGEX;
  public numberPattern = NUMBER_REGEX;
  public mobileNumPattern = MOBILE_NO_REGEX_V2;
  public mailPattern = EMAIL_REGEX;
  public postCodePattern = POST_CODE_REGEX;



  @ViewChild('endowmentAppForm') endowmentAppForm: NgForm;
  @ViewChild('applicantNameBn') applicantNameBn: any;
  @ViewChild('selectSchool') selectSchool: any;
  @ViewChild('selectClass') selectClass: any;
  @ViewChild('session') session: any;
  @ViewChild('selectVersion') selectVersion: any;
  @ViewChild('selectShift') selectShift: any;
  @ViewChild('applicantNameEn') applicantNameEn: any;
  @ViewChild('dateOfBirth') dateOfBirth: any;
  @ViewChild('email') email: any;
  @ViewChild('uploadImage') uploadImage: any;
  @ViewChild('mobileNo') mobileNo: any;
  @ViewChild('emergencyContactNumber') emergencyContactNumber: any;
  @ViewChild('gender') gender: any;
  @ViewChild('religion') religion: any;
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
  @ViewChild('presentAddressZilla') presentAddressZilla: any;
  @ViewChild('presentAddressDistrict') presentAddressDistrict: any;

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
  @ViewChild('permanentAddressDistrict') permanentAddressDistrict: any;
  @ViewChild('presentAddressPostOffice') presentAddressPostOffice: any;
  @ViewChild('presentAddressPostcode') presentAddressPostcode: any;
  @ViewChild('presentAddressUpzilla') presentAddressUpzilla: any;
  @ViewChild('applicantProfession') applicantProfession: any;

  constructor(
    private AdmissionFormService: AdmissionFormService,
    private toastr: ToastrService,
    private instituteService: InstituteService,
    private classGroupService: AppClassGroupService,
    private districtService: DistrictService,
    private classService: ClassService,
    private thanaService: ThanaService,
    private translate: TranslateService,
    private imageCompress: NgxImageCompressService
  ) { }

  public requestHeader: RequestHeader = new RequestHeader();
  public getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  public getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();
  public instituteInfo: GetInstituteInfoResponseBody = new GetInstituteInfoResponseBody();

  public instituteListRequestBody: InstituteListRequestBody = new InstituteListRequestBody();



  public classGroupListByClassSessionRequest: ClassGroupListByClassSessionRequest = new ClassGroupListByClassSessionRequest();
  public classGroupListByClassSessionRequestBody: ClassGroupListByClassSessionRequestBody = new ClassGroupListByClassSessionRequestBody();

  public admissionFormRequest: AdmissionFormRequest = new AdmissionFormRequest();
  public entity: AdmissionFormRequestBody = new AdmissionFormRequestBody();


  public districtList: DistrictList[];
  public thanaList: ThanaList[];
  public presentThanaList: ThanaList[];
  public permanentThanaList: ThanaList[];

  public districtListRequest: DistrictListRequest = new DistrictListRequest();
  public thanaListRequest: ThanaListRequest = new ThanaListRequest();
  public classLevelOid: String;

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });
    this.getInstituteList();
    this.getDistrictList();
    this.getThanaList();

    this.entity.presentAddress.districtOid = null;
    this.entity.presentAddress.thanaOid = null;
    this.entity.permanentAddress.districtOid = null;
    this.entity.permanentAddress.thanaOid = null;
    this.entity.nationality = 'Bangladeshi';
    //this.prepareDBData();
  }

  public studentIdList: string[] = ['13553622F110130', '13553622F110131', '13553622F110132', '13553622F110133', '13553622F110134', '13553622F110135', '13553622F110136', '13553622F110137', '13553622F110138', '13553622F110139', '13553622F110140', '13553622F110141', '13553622F110142', '13553622F110143', '13553622F110144', '13553622F110145', '13553622F110146', '13553622F110147', '13553622F110148', '13553622F110149', '13553622F110150', '13553622M110151', '13553622M110152', '13553622F110153', '13553622F110154', '13553622F110155', '13553622F110156', '13553622F110157', '13553622M110158', '13553622M110159', '13553622F110160', '13553622F110161', '13553622F110162', '13553622F110163', '13553622F110164', '13553622F110165'];
  public textBookList: string[] = ['SCHOOL-ERP-Education-Subject-Oid-Bangla-1st-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Bangla-2nd-Paper', 'SCHOOL-ERP-Education-Subject-Oid-English-1st-Paper', 'SCHOOL-ERP-Education-Subject-Oid-English-2nd-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Economics-1st-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Economics-2nd-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Accounting-1st-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Accounting-2nd-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Business-Organization-and-Management-1st-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Business-Organization-and-Management-2nd-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Product-Management-1st-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Product-Management-2nd-Paper', 'SCHOOL-ERP-Education-Subject-Oid-Information-and-Communication-Technology'];
  public subjectCodeList: string[] = ['101', '102', '107', '108', '174', '175', '176', '177', '178', '179', '265', '266', '275'];
  public textBookTypeList: string[] = ['101', '102', '107', '108', '174', '175', '176', '177', '178', '179', '265', '266', '275'];

  public oidList: string[] = [];
  public bookList: string[] = [];
  public idList: string[] = [];
  public codeList: string[] = [];
  public bookTypeList: string[] = [];

  prepareDBData() {
    this.studentIdList.forEach((data) => {
      this.textBookList.forEach((book) => {
        this.idList.push(data);
        this.bookList.push(book);
        var oid = "SCHOOL-ERP-135536-S-2021-2022-C-12-Humanities-ID-" + data + book.substring(32);
        this.oidList.push(oid)
      });
      this.subjectCodeList.forEach((code) => {
        this.codeList.push(code);
      });
      this.textBookTypeList.forEach((bookType) => {
        this.bookTypeList.push(bookType);
      });
    })
  }

  instituteListRequest: InstituteListRequest = new InstituteListRequest();
  getInstituteList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.instituteListRequest.body = this.instituteListRequestBody;

    this.instituteService.getInstituteList(this.instituteListRequest).subscribe((data) => {
      this.instituteList = data.body.instituteList;
      if (this.instituteList.length == 1) {
        this.entity.instituteOid = this.instituteList[0].oid;
        this.getInstituteInformation(this.entity.instituteOid);
      }
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });
  }

  getDistrictList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.districtListRequest.header = this.requestHeader;
    this.districtListRequest.body = new DistrictListRequestBody;

    this.districtService.getDistrictList(this.districtListRequest).subscribe((data) => {
      this.districtList = data.body.districtList;
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });
  }

  getThanaList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.thanaListRequest.header = this.requestHeader;
    this.thanaListRequest.body = new ThanaListRequestBody;

    this.thanaService.getThanaList(this.thanaListRequest).subscribe((data) => {
      this.thanaList = data.body.thanaList;
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });
  }

  getInstituteInformation(instituteOid: string) {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteInfoRequest.header = this.requestHeader;
    this.getInstituteInfoRequest.body = this.getInstituteInfoRequestBody;
    this.getInstituteInfoRequest.body.oid = instituteOid;

    this.instituteService.getInstituteInfo(this.getInstituteInfoRequest).subscribe((data) => {

      this.entity.instituteSessionOid = '';
      this.classLevelOid = '';
      this.entity.instituteVersionOid = '';
      this.entity.instituteShiftOid = '';
      this.entity.instituteClassGroupOid = null;
      this.isShowClassGroup = false;

      this.instituteInfo = data.body;
      this.shiftList = data.body.shiftList;
      this.classList = data.body.classList;
      this.sessionList = data.body.sessionList;
      this.versionList = data.body.versionList;

      this.sessionList = data.body.sessionList.filter(res => (res.status.toLowerCase() === "running") || (res.status.toLowerCase() === "upcoming"));

      if (this.sessionList.length == 1) {
        this.entity.instituteSessionOid = this.sessionList[0].oid;
      }
      if (this.versionList.length == 1) {
        this.entity.instituteVersionOid = this.versionList[0].oid;
      }
      if (this.shiftList.length == 1) {
        this.entity.instituteShiftOid = this.shiftList[0].oid;
      }



    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });
  }

  loadPresentAdressThana() {
    this.presentThanaList = [];
    this.entity.presentAddress.thanaOid = null;
    this.presentThanaList = _.where(this.thanaList, { districtOid: this.entity.presentAddress.districtOid });
  }

  loadPermanentAdressThana() {
    this.permanentThanaList = [];
    this.entity.permanentAddress.thanaOid = null;
    this.permanentThanaList = _.where(this.thanaList, { districtOid: this.entity.permanentAddress.districtOid });
  }

  public header: Header = new Header();



  checkAndSubmitApplication() {
    if (!this.isValidData()) {
      return;
    }

    var presentDistrict = _.where(this.districtList, { oid: this.entity.presentAddress.districtOid });
    var presentThana = _.where(this.thanaList, { oid: this.entity.presentAddress.thanaOid });
    var permanentDistrict = _.where(this.districtList, { oid: this.entity.permanentAddress.districtOid });
    var permanentThana = _.where(this.thanaList, { oid: this.entity.permanentAddress.thanaOid });

    this.entity.presentAddress.districtNameEn = presentDistrict[0].nameEn;
    this.entity.presentAddress.districtNameBn = presentDistrict[0].nameBn;
    this.entity.presentAddress.thanaNameEn = presentThana[0].nameEn;
    this.entity.presentAddress.thanaNameBn = presentThana[0].nameBn;


    this.entity.permanentAddress.districtNameEn = permanentDistrict[0].nameEn;
    this.entity.permanentAddress.districtNameBn = permanentDistrict[0].nameBn;
    this.entity.permanentAddress.thanaNameEn = permanentThana[0].nameEn;
    this.entity.permanentAddress.thanaNameBn = permanentThana[0].nameBn;


    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.admissionFormRequest.header = this.requestHeader;
    this.admissionFormRequest.body = this.entity;
    this.admissionFormRequest.body.status = 'Submitted';
    this.admissionFormRequest.body.nationality = 'Bangladeshi';
    var instituteObj = _.where(this.instituteList, { oid: this.entity.instituteOid });
    this.admissionFormRequest.body.educationCurriculumOid = instituteObj[0].educationCurriculumOid;

    if (this.entity != null) {
      this.AdmissionFormService.submitAdmissionApplicationForm(this.admissionFormRequest).subscribe(resData => {
        if (resData.header.responseCode == '200') {
          this.admissionId = resData.body.admissionId;
          this.isShowForm = false;
          this.isShowSuccessMsg = true;
        }
      });
    }

  }


  isValidData() {

    if (!this.entity.instituteOid) {
      this.toastr.error('Please! Select School');
      this.selectSchool.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteSessionOid) {
      this.toastr.error('Please! Select Session');
      this.session.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteClassOid) {
      this.toastr.error('Please! Select Class');
      this.selectClass.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteVersionOid) {
      this.toastr.error('Please! Select Version');
      this.selectVersion.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteShiftOid) {
      this.toastr.error('Please! Select Shift');
      this.selectShift.nativeElement.focus();
      return false;
    }
    if (!this.entity.applicantNameEn.match(this.namePattern)) {
      this.toastr.error('Please! Check Name in English');
      this.applicantNameEn.nativeElement.focus();
      return false;
    }
    if (!this.entity.applicantNameBn) {
      this.toastr.error('Please! Check Name in Bangla');
      this.applicantNameBn.nativeElement.focus();
      return false;
    }
    if (!this.entity.dateOfBirth) {
      this.toastr.error('Please! Check Date of Birth');
      this.dateOfBirth.nativeElement.focus();
      return false;
    }
    if (!this.entity.gender) {
      this.toastr.error('Please! Check Gender');
      this.gender.nativeElement.focus();
      return false;
    }

    if (this.entity.mobileNo.match(this.mobileNoPattern)) {
      if (!this.entity.mobileNo.match(this.mobileNoPattern)) {
        this.toastr.error('Please! Enter valid Phone Number');
        this.mobileNo.nativeElement.focus();
        return false;
      }
    } else if (!this.entity.mobileNo) {
      this.toastr.error('Please! Check Mobile No');
      this.mobileNo.nativeElement.focus();
      return false;
    }
    if (this.entity.emergencyContactNo) {
      if (!this.entity.emergencyContactNo.match(this.mobileNoPattern)) {
        this.toastr.error('Please! Enter valid Emergency Phone Number');
        this.emergencyContactNumber.nativeElement.focus();
        return false;
      }
    }
    if (this.entity.email) {
      if (!this.entity.email.match(this.emailPattern)) {
        this.toastr.error('Please! Enter valid Email');
        this.email.nativeElement.focus();
        return false;
      }
    }

    if (!this.entity.presentAddress.districtOid) {
      this.toastr.error('Please! Select Present District');
      this.presentAddressZilla.nativeElement.focus();
      return false;
    }
    if (!this.entity.presentAddress.thanaOid) {
      this.toastr.error('Please! Select Present Thana');
      this.presentAddressThana.nativeElement.focus();
      return false;
    }

    if (!this.entity.permanentAddress.districtOid) {
      this.toastr.error('Please! Select Permanent District');
      this.permanentAddressZzilla.nativeElement.focus();
      return false;
    }
    if (!this.entity.permanentAddress.thanaOid) {
      this.toastr.error('Please! Select Permanent Thana');
      this.permanentAddressThana.nativeElement.focus();
      return false;
    }
    if (!this.entity.fatherNameEn.match(this.namePattern)) {
      this.toastr.error('Please! Check Father Name');
      this.fatherNameEn.nativeElement.focus();
      return false;
    }

    if (this.entity.fatherContactNumber.match(this.mobileNoPattern)) {
      if (!this.entity.fatherContactNumber.match(this.mobileNoPattern)) {
        this.toastr.error('Please! Enter valid Phone Number');
        this.fatherContactNumber.nativeElement.focus();
        return false;
      }
    } else if (!this.entity.fatherContactNumber) {
      this.toastr.error('Please! Check Father Contact Number');
      this.fatherContactNumber.nativeElement.focus();
      return false;
    }

    if (this.entity.fatherEmail) {
      if (!this.entity.fatherEmail.match(this.emailPattern)) {
        this.toastr.error('Please! Enter valid Email of Father');
        this.fatherEmail.nativeElement.focus();
        return false;
      }
    }
    if (!this.entity.motherNameEn.match(this.namePattern)) {
      this.toastr.error('Please! Check Mother Name');
      this.motherNameEn.nativeElement.focus();
      return false;
    }

    if (this.entity.motherContactNumber) {
      if (!this.entity.motherContactNumber.match(this.mobileNoPattern)) {
        this.toastr.error('Please! Enter valid Phone Number');
        this.motherContactNumber.nativeElement.focus();
        return false;
      }
    } else if (!this.entity.motherContactNumber) {
      this.toastr.error('Please! Check Mother Contact Number');
      this.motherContactNumber.nativeElement.focus();
      return false;
    }
    if (this.entity.motherEmail) {
      if (!this.entity.motherEmail.match(this.emailPattern)) {
        this.toastr.error('Please! Enter valid Email of Mother');
        this.motherEmail.nativeElement.focus();
        return false;
      }
    }
    return true;
  }

  changeAddressSelection(isChecked: boolean) {
    this.isAddressSameAsChecked = !isChecked;

    if (isChecked === undefined) {
      return;
    }
    if (isChecked) {
      this.entity.permanentAddress.careOf = this.entity.presentAddress.careOf;
      this.entity.permanentAddress.houseNo = this.entity.presentAddress.houseNo;
      this.entity.permanentAddress.roadNo = this.entity.presentAddress.roadNo;
      this.entity.permanentAddress.villageOrWord = this.entity.presentAddress.villageOrWord;
      this.entity.permanentAddress.postOffice = this.entity.presentAddress.postOffice;
      this.entity.permanentAddress.postcode = this.entity.presentAddress.postcode;
      this.entity.permanentAddress.thana = this.entity.presentAddress.thana;
      this.entity.permanentAddress.thanaOid = this.entity.presentAddress.thanaOid;
      this.entity.permanentAddress.district = this.entity.presentAddress.district;
      this.entity.permanentAddress.districtOid = this.entity.presentAddress.districtOid;
      this.permanentThanaList = this.presentThanaList;
    } else {
      this.entity.permanentAddress.careOf = '';
      this.entity.permanentAddress.houseNo = '';
      this.entity.permanentAddress.roadNo = '';
      this.entity.permanentAddress.villageOrWord = '';
      this.entity.permanentAddress.postOffice = '';
      this.entity.permanentAddress.postcode = '';
      this.entity.permanentAddress.thana = '';
      this.entity.permanentAddress.thanaOid = null;
      this.entity.permanentAddress.district = '';
      this.entity.permanentAddress.districtOid = null;
      this.permanentThanaList = [];
    }
  }

  public getClassListBySessionRequest: GetClassListBySessionOidRequest = new GetClassListBySessionOidRequest();
  public getClassListBySessionRequestBody: GetClassListBySessionOidRequestBody = new GetClassListBySessionOidRequestBody();
  loadClassBySession(instituteSessionOid: string) {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.getClassListBySessionRequestBody.instituteSessionOid = instituteSessionOid;
    this.getClassListBySessionRequest.header = this.requestHeader;
    this.getClassListBySessionRequest.body = this.getClassListBySessionRequestBody;

    this.classService.getClassListBySessionOid(this.getClassListBySessionRequest).subscribe((data) => {
      this.entity.instituteClassGroupOid = null;
      this.classLevelOid = '';
      this.isShowClassGroup = false;

      this.instituteClassBySessionList = data.body.instituteClassList;
      this.entity.instituteClassOid = '';
      this.classList = [];
      this.classList = this.instituteClassBySessionList;
      this.classLevelList = data.body.instituteClassLevelList;
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });
  }

  selectClassFromClassLevel() {
    var sortOrder = 10000000;
    this.classList.map(item => {
      if (item.sortOrder < sortOrder && item.instituteClassLevelOid === this.classLevelOid) {
        sortOrder = item.sortOrder;
        this.entity.instituteClassOid = item.oid;
      }
    })
  }

  loadClassGroup(entity: any) {
    this.selectClassFromClassLevel();
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.classGroupListByClassSessionRequest.header = this.requestHeader;
    this.classGroupListByClassSessionRequestBody.instituteOid = this.entity.instituteOid;
    this.classGroupListByClassSessionRequestBody.sessionOid = this.entity.instituteSessionOid;
    this.classGroupListByClassSessionRequestBody.classOid = this.entity.instituteClassOid;
    this.classGroupListByClassSessionRequest.body = this.classGroupListByClassSessionRequestBody;

    this.classGroupService.getClassGroupByClassSessionList(this.classGroupListByClassSessionRequest).subscribe((data) => {
      this.classGroupList = data.body.classGroupList;
      if (this.classGroupList.length > 0) {
        this.isShowClassGroup = true;
      } else {
        this.isShowClassGroup = false;
      }
      if (this.classGroupList.length == 1) {
        this.entity.instituteClassGroupOid = this.classGroupList[0].oid.toString();

      }
    }, (error) => {
      console.log(error);
      this.toastr.error(error.Message);
    });

  }




  public url: any;
  public imageSet: string;
  public applicantPhoto: any = File;

  // onSelect(event) {
  //   let img = new Image();
  //   let fileSize = parseInt(((event.target.files[0].size) / 1000).toFixed(0));
  //   let fileType = event.target.files[0].type;
  //   if (fileType == 'image/jpeg' || fileType == 'image/png') {
  //     img.src = window.URL.createObjectURL(event.target.files[0])

  //     //temporary
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event) => {
  //       this.url = event.target.result;
  //       this.fileUpload();
  //     }



  //     // img.onload = () => {
  //     //   if (img.width == 300 && img.height == 300 && fileSize <= 50) {
  //     //     // upload logic here
  //     //     this.notificationType = 'success';
  //     //     this.isShowNotificationMessage = true;
  //     //     this.isShowPhotoResizeLink = false;
  //     //     this.notificationMessage = "Image selected with required Type and Size";
  //     //     setTimeout(() => {
  //     //       this.isShowNotificationMessage = false;
  //     //     }, this.notificationDelay);
  //     //     if (event.target.files && event.target.files[0]) {
  //     //       const file = event.target.files[0]
  //     //       this.applicantPhoto = file;
  //     //       var reader = new FileReader();
  //     //       reader.readAsDataURL(event.target.files[0]);
  //     //       reader.onload = (event) => {
  //     //         this.url = event.target.result;
  //     //         this.fileUpload();
  //     //       }
  //     //     }
  //     //   }
  //     //   else if (img.width == 300 && img.height == 300 && fileSize > 50) {
  //     //     this.url = null;
  //     //     this.notificationType = 'danger';
  //     //     this.isShowNotificationMessage = true;
  //     //     this.isShowPhotoResizeLink = true;
  //     //     this.notificationMessage = `Sorry, we require maximum of 50kb image but your image is
  //     //      ${fileSize}kb. Resize the image from`;
  //     //   }
  //     //   else if ((img.width != 300 || img.height != 300) && (fileSize <= 50)) {
  //     //     this.url = null;
  //     //     this.notificationType = 'danger';
  //     //     this.isShowNotificationMessage = true;
  //     //     this.isShowPhotoResizeLink = true;
  //     //     this.notificationMessage = `Sorry, we require 300 x 300 pixels image but your image is ${img.width} x ${img.height} pixels . Resize the image from `;
  //     //   }
  //     //   else if ((img.width != 300 || img.height != 300) && fileSize > 50) {
  //     //     this.url = null;
  //     //     this.notificationType = 'danger';
  //     //     this.isShowNotificationMessage = true;
  //     //     this.isShowPhotoResizeLink = true;
  //     //     this.notificationMessage = `Sorry, we require 300 x 300 pixels(maximum of 50kb) image but your image is
  //     //     ${img.width} x ${img.height} pixels with file size  ${fileSize}kb.
  //     //      Resize the image from `;
  //     //   }
  //     // }
  //   } else {
  //     this.url = null;
  //     this.notificationType = 'danger';
  //     this.isShowNotificationMessage = true;
  //     this.isShowPhotoResizeLink = false;
  //     this.notificationMessage = `Wrong file format!!! Please Select JPEG/PNG file.`;
  //   }
  // }
  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      this.applicantPhoto = file;

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }


}
