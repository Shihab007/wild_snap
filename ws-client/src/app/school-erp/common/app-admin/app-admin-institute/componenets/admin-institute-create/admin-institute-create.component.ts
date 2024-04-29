import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { DistrictList } from 'src/app/school-erp/common/shared/model/district/district-list';
import { DistrictListRequest } from 'src/app/school-erp/common/shared/request/district/district-list-request';
import { DistrictListRequestBody } from 'src/app/school-erp/common/shared/request/district/district-list-request-body';
import { DistrictService } from 'src/app/school-erp/common/shared/services/district/district.service';
import { EducationService } from 'src/app/school-erp/common/shared/services/education/education.service';
import { EducationBoardEntity } from 'src/app/school-erp/common/shared/model/education/education-board-entity';
import { EducationMediumEntity } from 'src/app/school-erp/common/shared/model/education/education-medium-entity';
import { EducationCurriculumEntity } from 'src/app/school-erp/common/shared/model/education/education-curriculum-entity';
import { EducationSystemEntity } from 'src/app/school-erp/common/shared/model/education/education-system-entity';
import { GetEducationInfoRequest } from 'src/app/school-erp/common/shared/request/education/get-education-info-request';
import { GetEducationInfoRequestBody } from 'src/app/school-erp/common/shared/request/education/get-education-info-request-body';
import { EducationTypeEntity } from 'src/app/school-erp/common/shared/model/education/education-type-entity';
import { EducationGradingSystemEntity } from 'src/app/school-erp/common/shared/model/education/education-grading-system-entity';
import { EducationShiftEntity } from 'src/app/school-erp/common/shared/model/education/education-shift-entity';
import { InstituteAddRequest } from 'src/app/school-erp/common/shared/request/institute/institute-add-request';
import { InstituteAddRequestBody } from 'src/app/school-erp/common/shared/request/institute/institute-add-request-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { InstituteAddResponse } from 'src/app/school-erp/common/shared/response/institute/institute-add-response';
import { InstituteAddResponseBody } from 'src/app/school-erp/common/shared/response/institute/institute-add-response-body';
import { EducationVersionEntity } from 'src/app/school-erp/common/shared/model/education/education-version-entity';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { DUPLICATE_EIIN_NUMBER_RESPONSE_CODE, DUPLICATE_LOGIN_ID_RESPONSE_CODE, USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { EducationSessionEntity } from 'src/app/school-erp/common/shared/model/education/education-session-entity';
import { GetEducationInfoResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-info-response-body';
import { FileService } from 'src/app/common/services/file.service';
import { FileUploadResponse } from 'src/app/common/response/fileUploadResponse';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { BANGLA_REGEX, EMAIL_REGEX, MOBILE_NO_REGEX, NAME_REGEX, NUMBER_REGEX, POST_CODE_REGEX } from 'src/app/common/constant/reg-constant';
import { ThanaListRequest } from 'src/app/school-erp/common/shared/request/thana/thana-list-request';
import { ThanaListRequestBody } from 'src/app/school-erp/common/shared/request/thana/thana-list-request-body';
import { ThanaService } from 'src/app/school-erp/common/shared/services/thana/thana.service';
import { ThanaList } from 'src/app/school-erp/common/shared/model/thana/thana-list';
import * as _ from 'underscore';


@Component({
  selector: 'app-admin-institute-create',
  templateUrl: './admin-institute-create.component.html',
  styleUrls: ['./admin-institute-create.component.scss']
})
export class AdminInstituteCreateComponent implements OnInit {

  public local: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();

  public entity: InstituteAddRequestBody = new InstituteAddRequestBody();
  public educationShiftList: EducationShiftEntity[];
  public educationBoardList: EducationBoardEntity[];
  public educationMediumList: EducationMediumEntity[];
  public educationVersionList: EducationVersionEntity[];
  public educationCurriculumList: EducationCurriculumEntity[];
  public educationSystemList: EducationSystemEntity[];
  public educationTypeList: EducationTypeEntity[] = [];
  public sessionEducationTypeList: EducationTypeEntity[] = [];
  public sessionList: EducationSessionEntity[];
  public educationInfo: GetEducationInfoResponseBody = new GetEducationInfoResponseBody();
  public educationSessionList: EducationSessionEntity[];
  public educationGradingSystemList: EducationGradingSystemEntity[];
  public districtList: DistrictList[];

  constructor(
    private _districtService: DistrictService,
    private thanaService: ThanaService,
    private instituteService: InstituteService,
    private educationService: EducationService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private appStorageService: AppStorageService,
    private fileService: FileService,
    private router: Router
  ) { }

  public nameEnPattern = NAME_REGEX;
  public nameBnPattern = BANGLA_REGEX;
  public numberPattern = NUMBER_REGEX;
  public mobileNumPattern = MOBILE_NO_REGEX;
  public mailPattern = EMAIL_REGEX;
  public postCodePattern = POST_CODE_REGEX;

  public requestHeader: RequestHeader = new RequestHeader();
  public districtListRequest: DistrictListRequest = new DistrictListRequest();
  public districtListRequestBody: DistrictListRequestBody = new DistrictListRequestBody();
  public getEducationInfoRequest: GetEducationInfoRequest = new GetEducationInfoRequest();
  public getEducationInfoRequestBody: GetEducationInfoRequestBody = new GetEducationInfoRequestBody();
  public addInstituteRequest: InstituteAddRequest = new InstituteAddRequest();
  public addInstituteResponse: InstituteAddResponse = new InstituteAddResponse();
  public addInstituteResponeBody: InstituteAddResponseBody = new InstituteAddResponseBody();

  ngOnInit(): void {
    this.local = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });
    this.userInfo = JSON.parse(this.appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));

    this.setUpUI();
  }

  setUpUI() {
    this.getDistrictListData();
    this.getThanaList();
    this.getEducationInformation();
  }

  getDistrictListData() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.districtListRequest.header = this.requestHeader;
    this.districtListRequest.body = this.districtListRequestBody;

    this._districtService.getDistrictList(this.districtListRequest).subscribe(response => {
      if (response.header.responseCode === "200") {
        this.districtList = response.body.districtList;
      }
    });
  }

  public thanaListRequest: ThanaListRequest = new ThanaListRequest();
  public thanaList: ThanaList[];
  public filterThanaList: ThanaList[];


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

  loadThana() {
    console.log(this.entity.districtOid);

    this.filterThanaList = [];
    this.entity.thanaOid = null;
    this.filterThanaList = _.where(this.thanaList, { districtOid: this.entity.districtOid });

    console.log(this.filterThanaList);
  }

  getEducationInformation() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getEducationInfoRequest.header = this.requestHeader;
    this.getEducationInfoRequest.body = this.getEducationInfoRequestBody;

    this.educationService.getEducationInfo(this.getEducationInfoRequest)
      .subscribe(response => {
        if (response.header.responseCode === "200") {
          this.educationInfo = response.body;
          this.educationShiftList = response.body.educationShiftList;
          this.educationBoardList = response.body.educationBoardList;
          this.educationMediumList = response.body.educationMediumList;
          this.educationVersionList = response.body.educationVersionList;
          this.educationGradingSystemList = response.body.educationGradingSystemList;
          console.log(this.educationInfo)
        }
      },
        (error) => {
          console.log(error);
          this.toastr.error(error.Message);
        }
      );
  }

  changeMedium(event: any) {

    this.educationCurriculumList = [];
    this.educationCurriculumList = this.educationInfo.educationCurriculumList.filter(el => el.educationMediumOid == event.target.value);

  }

  changeCurriculum(event: any) {
    this.educationTypeList = [];
    this.educationSystemList = this.educationInfo.educationSystemList.filter(el => el.educationCurriculumOid == event.target.value);
  }

  changeEducationSystem(event: any) {
    this.educationTypeList = this.educationInfo.educationTypeList.filter(el => el.educationSystemOid == event.target.value);
    this.educationGradingSystemList = this.educationGradingSystemList.filter(el => el.educationSystemOid == event.target.value);
  }

  addInstitution() {

    if (!this.prepareInstituteSession()) {
      return;
    };

    if (!this.isValidData()) {
      return;
    }

    this.addInstituteRequest.header = this.header;
    this.addInstituteRequest.body = new InstituteAddRequestBody();
    this.addInstituteRequest.body = this.entity;
    this.addInstituteRequest.body.createdBy = this.userInfo.loginId;


    this.instituteService.addInstitute(this.addInstituteRequest).subscribe(data => {
      if (data.header.responseCode == "200") {
        this.toastr.success('Add Institute Successfully');
        this.router.navigate(['/admin/institute/list']);
      }
      if (data.header.responseCode == DUPLICATE_LOGIN_ID_RESPONSE_CODE) {
        this.toastr.warning('Login Id Already Exist!');
        this.loginId.nativeElement.focus();
      }
      if (data.header.responseCode == DUPLICATE_EIIN_NUMBER_RESPONSE_CODE) {
        this.toastr.warning('EIIN Number Already Exist!');
        this.eiinNumber.nativeElement.focus();
      }
    });
  }

  @ViewChild('instituteAppForm') instituteAppForm: NgForm;
  @ViewChild('instituteNameEn') instituteNameEn: any;
  @ViewChild('instituteNameBn') instituteNameBn: any;
  @ViewChild('instituteEmail') instituteEmail: any;
  @ViewChild('district') district: any;
  @ViewChild('instituteAddressEn') instituteAddressEn: any;
  @ViewChild('instituteAddressBn') instituteAddressBn: any;
  @ViewChild('instituteContactNumber') instituteContactNumber: any;
  @ViewChild('educationBoardOid') educationBoardOid: any;
  @ViewChild('educationShift') educationShift: any;
  @ViewChild('eiinNumber') eiinNumber: any;
  @ViewChild('userNameEn') userNameEn: any;
  @ViewChild('userNameBn') userNameBn: any;
  @ViewChild('loginId') loginId: any;
  @ViewChild('password') password: any;
  @ViewChild('educationMedium') educationMedium: any;
  @ViewChild('educationCurriculum') educationCurriculum: any;
  @ViewChild('educationSystem') educationSystem: any;
  @ViewChild('educationVersion') educationVersion: any;
  @ViewChild('educationType') educationType: any;


  @ViewChild('principalNameEn') principalNameEn: any;
  @ViewChild('principalNameBn') principalNameBn: any;
  @ViewChild('principalUserName') principalUserName: any;
  @ViewChild('principalPassword') principalPassword: any;
  @ViewChild('principalEmail') principalEmail: any;
  @ViewChild('principalPhoneNumber') principalPhoneNumber: any;
  @ViewChild('accountantNameEn') accountantNameEn: any;
  @ViewChild('accountantNameBn') accountantNameBn: any;
  @ViewChild('accountantUserName') accountantUserName: any;
  @ViewChild('accountantPassword') accountantPassword: any;
  @ViewChild('accountantEmail') accountantEmail: any;
  @ViewChild('accountantPhoneNumber') accountantPhoneNumber: any;


  isValidData() {
    if (!this.entity.nameEn.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Institute Name in English');
      this.instituteNameEn.nativeElement.focus();
      return false;
    }
    if (!this.entity.nameBn) {
      this.toastr.error('Please! Check Institute Name in Bangla');
      this.instituteNameBn.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteEmail.match(this.mailPattern)) {
      this.toastr.error('Please! Check Institute Email');
      this.instituteEmail.nativeElement.focus();
      return false;
    }
    if (!this.entity.districtOid) {
      this.toastr.error('Please! Select District');
      this.district.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteAddress) {
      this.toastr.error('Please! Check Institute Address in English');
      this.instituteAddressEn.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteAddressBn) {
      this.toastr.error('Please! Check Institute Address in Bangla');
      this.instituteAddressBn.nativeElement.focus();
      return false;
    }
    if (!this.entity.instituteContactNumber.match(this.mobileNumPattern)) {
      this.toastr.error('Please! Check Institute Contact Number');
      this.instituteContactNumber.nativeElement.focus();
      return false;
    }
    if (this.entity.instituteShiftList.length == 0) {
      this.toastr.error('Please! Select Education Shift');
      this.educationShift.nativeElement.focus();
      return false;
    }

    if (!this.entity.educationBoardOid) {
      this.toastr.error('Please! Select Education Board');
      this.educationBoardOid.nativeElement.focus();
      return false;
    }
    if (!this.entity.eiinNumber) {
      this.toastr.error('Please! Check Institute EIIN Number');
      this.eiinNumber.nativeElement.focus();
      return false;
    }
    if (!this.entity.userNameEn.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check User Name in English');
      this.userNameEn.nativeElement.focus();
      return false;
    }
    if (!this.entity.userNameBn) {
      this.toastr.error('Please! Check User Name in Bangla');
      this.userNameBn.nativeElement.focus();
      return false;
    }
    if (!this.entity.loginId) {
      this.toastr.error('Please! Check Login Id');
      this.loginId.nativeElement.focus();
      return false;
    }
    if (!this.entity.password) {
      this.toastr.error('Please! Check Password');
      this.password.nativeElement.focus();
      return false;
    }
    if (!this.entity.educationMediumOid) {
      this.toastr.error('Please! Select Education Medium');
      this.educationMedium.nativeElement.focus();
      return false;
    }
    if (!this.entity.educationCurriculumOid) {
      this.toastr.error('Please! Select Education Curriculum');
      this.educationCurriculum.nativeElement.focus();
      return false;
    }
    if (!this.entity.educationSystemOid) {
      this.toastr.error('Please! Select Education System');
      this.educationSystem.nativeElement.focus();
      return false;
    }
    if (this.entity.instituteVersionList.length == 0) {
      this.toastr.error('Please! Select Education Version');
      this.educationVersion.nativeElement.focus();
      return false;
    }
    if (this.entity.instituteTypeList.length == 0) {
      this.toastr.error('Please! Select Institute Education Type');
      this.educationType.nativeElement.focus();
      return false;
    }

    if (!this.entity.principalNameEn.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Principal Name in English');
      this.instituteNameEn.nativeElement.focus();
      return false;
    }

    if (!this.entity.principalUserName.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Principal User Name');
      this.instituteNameEn.nativeElement.focus();
      return false;
    }

    if (this.entity.principalPhoneNumber)
      if (!this.entity.principalPhoneNumber.match(this.mobileNumPattern)) {
        this.toastr.error('Please! Check Principal Contact Number');
        this.instituteContactNumber.nativeElement.focus();
        return false;
      }

    if (!this.entity.principalEmail.match(this.mailPattern)) {
      this.toastr.error('Please! Check Principal Email');
      this.instituteEmail.nativeElement.focus();
      return false;
    }

    if (!this.entity.principalPassword) {
      this.toastr.error('Please! Check Principal Password');
      this.instituteEmail.nativeElement.focus();
      return false;
    }



    if (!this.entity.accountantNameEn.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Accountant Name in English');
      this.instituteNameEn.nativeElement.focus();
      return false;
    }

    if (!this.entity.accountantUserName.match(this.nameEnPattern)) {
      this.toastr.error('Please! Check Accountant User Name');
      this.instituteNameEn.nativeElement.focus();
      return false;
    }

    if (this.entity.accountantPhoneNumber)
      if (!this.entity.accountantPhoneNumber.match(this.mobileNumPattern)) {
        this.toastr.error('Please! Check Accountant Contact Number');
        this.instituteContactNumber.nativeElement.focus();
        return false;
      }

    if (!this.entity.accountantEmail.match(this.mailPattern)) {
      this.toastr.error('Please! Check Accountant Email');
      this.instituteEmail.nativeElement.focus();
      return false;
    }

    if (!this.entity.accountantPassword) {
      this.toastr.error('Please! Check Accountant Password');
      this.instituteEmail.nativeElement.focus();
      return false;
    }

    return true;
  }

  prepareInstituteSession() {

    this.entity.instituteShiftList = this.educationShiftList.filter(i => i.check);
    this.entity.instituteTypeList = this.educationTypeList.filter(i => i.check);
    this.entity.instituteVersionList = this.educationVersionList.filter(i => i.check);

    this.educationInfo.educationSessionList.filter(obj => {
      return obj.status === "Running";
    });

    this.sessionList = [];
    this.educationInfo.educationSessionList.forEach((data) => {

      if (data.educationTypeJson) {
        var eduTypeList: EducationTypeEntity[] = JSON.parse(data.educationTypeJson);
        var checkSessionList = eduTypeList.filter(x => this.entity.instituteTypeList.map(y => y.oid).includes(x.oid));
        if (checkSessionList.length > 0) {
          var sessionObj: EducationSessionEntity = new EducationSessionEntity();
          sessionObj.oid = data.oid;
          sessionObj.nameEn = data.nameEn;
          sessionObj.nameBn = data.nameBn;
          sessionObj.educationTypeJson = JSON.stringify(checkSessionList);
          sessionObj.status = data.status;
          sessionObj.educationSystemOid = data.educationSystemOid;
          sessionObj.educationCurriculumOid = data.educationCurriculumOid;
          sessionObj.createdBy = data.createdBy;
          this.sessionList.push(sessionObj);
        };
      }

    });
    this.entity.instituteSessionList = this.sessionList;
    if (this.entity.instituteSessionList.length < 1) {
      this.toastr.error("Please put some valid session!")
    }

    return true;

  }


  public logoUrl: any;
  public imageSet: string;
  public logoPhoto: any = File;

  onSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      this.logoPhoto = file;

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.logoUrl = event.target.result;
        this.fileUpload();
      }
    }
  }

  public imageUploadResponse: FileUploadResponse = new FileUploadResponse();
  fileUpload() {
    const formData = new FormData();
    formData.append('file', this.logoPhoto)

    this.fileService.uploadImage(formData).subscribe((data) => {
      this.imageUploadResponse = data;
      this.entity.logoUrl = environment.uploadImageUrl + data.name;
      this.entity.logoPath = data.url + "/" + data.name;

    }, (error) => console.log(error));
  }

}



