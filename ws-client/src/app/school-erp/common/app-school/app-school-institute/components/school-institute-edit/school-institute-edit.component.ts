import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { DistrictList } from 'src/app/school-erp/common/shared/model/district/district-list';
import { DistrictListRequest } from 'src/app/school-erp/common/shared/request/district/district-list-request';
import { DistrictListRequestBody } from 'src/app/school-erp/common/shared/request/district/district-list-request-body';
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
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { EducationSessionEntity } from 'src/app/school-erp/common/shared/model/education/education-session-entity';
import { GetEducationInfoResponseBody } from 'src/app/school-erp/common/shared/response/education/get-education-info-response-body';
import { environment } from 'src/environments/environment';
import { GetInstituteByOidRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-by-oid-request';
import { GetInstituteByOidRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-by-oid-request-body';
import { GetInstituteByOidResponseBody } from 'src/app/school-erp/common/shared/response/institute/get-institute-by-oid-response-body';
import { activeStatusList } from 'src/app/common/constant/list-status';
import { DropdownData } from 'src/app/common/constant/dropdown-data';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstantService } from 'src/app/common/services/constant.service';
import { NgxSpinnerConfiguration } from 'src/app/school-erp/common/shared/model/ngx-spinner-configuration';
import { AddNewTeacherService } from 'src/app/school-erp/common/shared/services/teacher/add-new-teacher.service';
import { ImageUploadResponse } from 'src/app/school-erp/common/shared/response/teacher/imageUploadResponse';
import { Location } from '@angular/common';



@Component({
  selector: 'app-school-institute-edit',
  templateUrl: './school-institute-edit.component.html',
  styleUrls: ['./school-institute-edit.component.scss']
})
export class SchoolInstituteEditComponent implements OnInit {

  constructor(
    private _instituteService: InstituteService,
    private _translate: TranslateService,
    private _toastr: ToastrService,
    private _appStorageService: AppStorageService,
    private _imageUploadService: AddNewTeacherService,
    private _spinner: NgxSpinnerService,
    private _constantService: ConstantService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }

  public spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();
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
  public activeStatusList: DropdownData[] = activeStatusList;

  public isShowNotificationMessage: boolean;
  public notificationMessage: string;
  public notificationDelay: number = 5000;
  public notificationType: string;
  public isShowPhotoResizeLink: boolean;


  public requestHeader: RequestHeader = new RequestHeader();
  public districtListRequest: DistrictListRequest = new DistrictListRequest();
  public districtListRequestBody: DistrictListRequestBody = new DistrictListRequestBody();
  public getEducationInfoRequest: GetEducationInfoRequest = new GetEducationInfoRequest();
  public getEducationInfoRequestBody: GetEducationInfoRequestBody = new GetEducationInfoRequestBody();
  public addInstituteRequest: InstituteAddRequest = new InstituteAddRequest();
  public addInstituteResponse: InstituteAddResponse = new InstituteAddResponse();
  public addInstituteResponeBody: InstituteAddResponseBody = new InstituteAddResponseBody();

  ngOnInit(): void {
    this.local = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.local = 'en';
      } else {
        this.local = 'bn';
      }
    });
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));

    this.setUpUI();
  }

  setUpUI() {
    this.getInstituteByOid();
  }



  public getInstituteByOidRequest: GetInstituteByOidRequest = new GetInstituteByOidRequest();
  public getInstituteByOidRequestBody: GetInstituteByOidRequestBody = new GetInstituteByOidRequestBody();
  public institute: GetInstituteByOidResponseBody = new GetInstituteByOidResponseBody();
  // instituteShiftList: InstituteShiftEntity[];
  // instituteVersionList: InstituteVersionEntity[];
  // instituteTypeList: InstituteTypeEntity[];
  // instituteGradingSystemList: InstituteGradingSystemEntity[];
  // instituteClassList: InstituteClassEntity[];
  // instituteClassGroupList: InstituteClassGroupEntity[];
  // instituteClassLevelList: InstituteClassLevelEntity[];
  // gradingSystemDetailsList: InstituteGradingSystemDetailsEntity[];
  // instituteTextbookList: InstituteTextbookEntity[];

  getInstituteByOid() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteByOidRequest.header = this.requestHeader;
    this.getInstituteByOidRequestBody.oid = this._route.snapshot.params["oid"];
    this.getInstituteByOidRequest.body = this.getInstituteByOidRequestBody;
    this._spinner.show();
    this._instituteService.getInstituteByOid(this.getInstituteByOidRequest).subscribe(data => {
      this._spinner.hide();
      console.log('institute data');
      console.log(data);

      if (data.header.responseCode === "200") {
        this.entity.nameEn = data.body.nameEn;
        this.entity.nameBn = data.body.nameBn;
        this.entity.instituteEmail = data.body.instituteEmail;
        this.entity.instituteAddress = data.body.instituteAddress;
        this.entity.instituteAddressBn = data.body.instituteAddressBn;
        this.entity.instituteContactNumber = data.body.instituteContactNumber;
        this.entity.status = data.body.status;
        this.entity.logoUrl = data.body.logoUrl;
        this.entity.logoPath = data.body.logoPath;
        this.profilePhoto = data.body.logoUrl;
        this.url = data.body.logoUrl;

        // this.instituteShiftList = data.body.instituteShiftList;
        // this.instituteVersionList = data.body.instituteVersionList;
        // this.instituteTypeList = data.body.instituteTypeList;
        // this.instituteGradingSystemList = data.body.instituteGradingSystemList;
        // this.instituteClassList = data.body.instituteClassList;
        // this.instituteClassGroupList = data.body.instituteClassGroupList;
        // this.instituteClassLevelList = data.body.instituteClassLevelList;
        // this.gradingSystemDetailsList = data.body.gradingSystemDetailsList;
        // this.instituteTextbookList = data.body.instituteTextbookList;


      }
    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      }
    );
  }




  editInstitution() {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.addInstituteRequest.header = this.requestHeader;
    this.addInstituteRequest.body = new InstituteAddRequestBody();
    this.addInstituteRequest.body = this.entity;
    this.addInstituteRequest.body.oid = this.userInfo.instituteOid;

    console.log("Update Institute Request : ");
    console.log(this.addInstituteRequest);

    this._spinner.show();
    this._instituteService.editInstitute(this.addInstituteRequest).subscribe(data => {
      this._spinner.hide();
      console.log("Create Institute Response : ");
      console.log(data);
      if (data.header.responseCode == "200") {
        this._toastr.success('Updated Institute Successfully');
        this.goBack();
      }
    }, (error) => {
      console.log(error);
      this._spinner.hide();
      this._toastr.error(error.Message);
    });
  }


  public url: any;
  public imageSet: string;
  public applicantPhoto: any = File;
  public profilePhoto: any;

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
          this.local == 'en' ? this.notificationMessage = "Image selected with required Type and Size"
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
          this.local == 'en' ? this.notificationMessage = `Sorry, we require maximum of 50kb image but your image is 
           ${fileSize}kb. Resize the image from` : this.notificationMessage = `দুঃখিত। ছবিটি ৫০ কিলোবাইট অতিক্রম করেছে। আপনার ছবিটির সাইজ 
           ${fileSize} কিলোবাইট। রিসাইজ করুন`;

        }
        else if ((img.width != 300 || img.height != 300) && (fileSize <= 50)) {
          this.url = null;
          this.notificationType = 'danger';
          this.isShowNotificationMessage = true;
          this.isShowPhotoResizeLink = true;
          this.local == 'en' ?
            this.notificationMessage = `Sorry, we require 300 x 300 pixels image but your image is ${img.width} x ${img.height} pixels . Resize the image from `
            : this.notificationMessage = `দুঃখিত। ছবিটি ৩০০X৩০০ পিক্সেলের নয়। আপনার ছবিটি  ${img.width} x ${img.height} পিক্সেলের। অনুগ্রহ করে রিসাইজ করুন `;

        }
        else if ((img.width != 300 || img.height != 300) && fileSize > 50) {
          this.url = null;
          this.notificationType = 'danger';
          this.isShowNotificationMessage = true;
          this.isShowPhotoResizeLink = true;
          this.local == 'en' ? this.notificationMessage = `Sorry, we require 300 x 300 pixels(maximum of 50kb) image but your image is
          ${img.width} x ${img.height} pixels with file size  ${fileSize}kb.
           Resize the image from `
            : this.notificationMessage = `দুঃখিত। ছবিটি ৩০০X৩০০(সর্বোচ্চ ৫০ কিলোবাইট) পিক্সেলের নয়। আপনার ছবিটি
          ${img.width} x ${img.height} পিক্সেলের এবং ফাইল সাইজ ${fileSize}কিলোবাইট।
           অনুগ্রহ করে রিসাইজ করুন`;
        }

      }
    } else {
      this.url = null;
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;
      this.isShowPhotoResizeLink = false;
      this.local == 'en' ? this.notificationMessage = `Wrong file format!!! Please Select JPEG/PNG file.`
        : this.notificationMessage = `ফাইল ফরমেট ভুল। অনুগ্রহ করে JPEG/PNG ফাইল ফরমেট নির্বাচন করুন`;
    }

  }

  public imageUploadResponse: ImageUploadResponse = new ImageUploadResponse();
  fileUpload() {
    const formData = new FormData();
    formData.append('file', this.applicantPhoto)
    console.log(formData)
    this._spinner.show();
    this._imageUploadService.uploadImage(formData).subscribe((data) => {
      this._spinner.hide();
      this.imageUploadResponse = data;
      this.entity.logoUrl = environment.uploadImageUrl + data.name;
      this.entity.logoPath = data.url + "/" + data.name;
      // console.log(this.entity.photoPath);
      // console.log(this.entity.photoUrl);

    },
      (error) => {
        console.log(error);
        this._spinner.hide();
        this._toastr.error(error.Message);
      });
  }

  goBack() {
    this._location.back();
  }

}



