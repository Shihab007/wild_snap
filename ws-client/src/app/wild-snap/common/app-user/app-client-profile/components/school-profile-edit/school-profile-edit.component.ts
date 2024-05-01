import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmailRegEx, mobileNoRegEx, USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { BANGLA_REGEX, EMAIL_REGEX, MOBILE_NO_REGEX, MOBILE_NO_REGEX_V2, NAME_REGEX, NUMBER_REGEX } from 'src/app/common/constant/reg-constant';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { GetProfileByLoginIdRequest } from 'src/app/wild-snap/common/shared/request/security/get-profile-by-login-id-request';
import { GetProfileByLoginIdRequestBody } from 'src/app/wild-snap/common/shared/request/security/get-profile-by-login-id-request-body';
import { UpdateProfileByLoginIdRequest } from 'src/app/wild-snap/common/shared/request/security/update-profile-by-login-id-request';
import { UpdateProfileByLoginIdRequestBody } from 'src/app/wild-snap/common/shared/request/security/update-profile-by-login-id-request-body';
import { GetProfileByLoginIdResponseBody } from 'src/app/wild-snap/common/shared/response/security/get-profile-by-login-id-response-body';
import { ImageUploadResponse } from 'src/app/wild-snap/common/shared/response/teacher/imageUploadResponse';
import { SecurityService } from 'src/app/wild-snap/common/shared/services/security/security.service';
import { AddNewTeacherService } from 'src/app/wild-snap/common/shared/services/teacher/add-new-teacher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-school-profile-edit',
  templateUrl: './school-profile-edit.component.html',
  styleUrls: ['./school-profile-edit.component.scss']
})
export class SchoolProfileEditComponent implements OnInit {

  @ViewChild('nameEn') nameEn: any;
  @ViewChild('nameBn') nameBn: any;
  @ViewChild('mobileNo') mobileNo: any;
  @ViewChild('email') email: any;

  public userInfo: UserInfo = new UserInfo();

  public nameEnPattern = NAME_REGEX;
  public nameBnPattern = BANGLA_REGEX;
  public numberPattern = NUMBER_REGEX;
  public mobileNumPattern = MOBILE_NO_REGEX;
  public mailPattern = EMAIL_REGEX;


  public locale: any;
  constructor(
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _appStorageService: AppStorageService,
    private _securityService: SecurityService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _location: Location,
    private _imageUploadService: AddNewTeacherService,
  ) { }

  ngOnInit(): void {
    this.locale = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.getProfileByLoginId();
  }


  public getProfileByLoginIdRequest: GetProfileByLoginIdRequest = new GetProfileByLoginIdRequest();
  public getProfileByLoginIdRequestBody: GetProfileByLoginIdRequestBody = new GetProfileByLoginIdRequestBody();
  public getProfileByLoginIdResponse: GetProfileByLoginIdResponseBody = new GetProfileByLoginIdResponseBody();
  getProfileByLoginId() {
    this.getProfileByLoginIdRequest.body = this.getProfileByLoginIdRequestBody;
    this.getProfileByLoginIdRequest.body.loginId = this.userInfo.loginId;
    this._spinner.show();
    this._securityService.getProfileByLoginId(this.getProfileByLoginIdRequest).subscribe((data) => {
      this._spinner.hide();
      if (data.header.responseCode == "200") {
        this.entity = data.body;
        this.url = this.entity.userPhotoUrl;
      }
    }, (error) => {
      this._spinner.hide();
      this._toastr.error(error.Message);
      console.log(error);
    }
    );
  }

  public updateProfileByLoginIdRequest: UpdateProfileByLoginIdRequest = new UpdateProfileByLoginIdRequest();
  public entity: UpdateProfileByLoginIdRequestBody = new UpdateProfileByLoginIdRequestBody();
  updateProfileByLoginId() {

    if (!this.entity.nameEn.trim().match(this.nameEnPattern)) {
      this._toastr.error('Please! Enter English Name');
      this.nameEn.nativeElement.focus();
      return false;
    }

    if (!this.entity.nameBn.trim()) {
      this._toastr.error('Please! Enter valid Bangla Name');
      this.nameBn.nativeElement.focus();
      return false;
    }

    if (!this.entity.mobileNo) {
      if (!this.entity.mobileNo.match(this.mobileNumPattern)) {
        this._toastr.error('Please! Enter valid Phone Number');
        this.mobileNo.nativeElement.focus();
        return false;
      }
    }

    if (!this.entity.email) {
      if (!this.entity.email.match(this.mailPattern)) {
        this._toastr.error('Please! Enter valid Email');
        this.email.nativeElement.focus();
        return false;
      }
    }

    this.updateProfileByLoginIdRequest.body = this.entity;
    this.updateProfileByLoginIdRequest.body.loginId = this.userInfo.loginId;
    this._spinner.show();
    this._securityService.updateProfileByLoginId(this.updateProfileByLoginIdRequest).subscribe((data) => {
      this._spinner.hide();
      if (data.header.responseCode == "200") {
        this._router.navigate(["/school/profile/view"]);

        if (this.locale == "en") {
          this._toastr.success('Profile Information has been Updated!');
        } else {
          this._toastr.success('প্রোফাইল তথ্য আপডেট করা হয়েছে!');
        }
      }
    }, (error) => {
      this._spinner.hide();
      this._toastr.error(error.Message);
      console.log(error);
    }
    );
  }



  public isShowNotificationMessage: boolean;
  public notificationMessage: string;
  public notificationDelay: number = 5000;
  public notificationType: string;
  public isShowPhotoResizeLink: boolean;
  public imageUploadResponse: ImageUploadResponse = new ImageUploadResponse();

  public url: any;
  public imageSet: string;
  public applicantPhoto: any = File;

  onSelect(event) {
    let img = new Image();
    let fileSize = parseInt(((event.target.files[0].size) / 1000).toFixed(0));
    let fileType = event.target.files[0].type;

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

  fileUpload() {
    const formData = new FormData();
    formData.append('file', this.applicantPhoto)

    this._spinner.show();
    this._imageUploadService.uploadImage(formData).subscribe((data) => {
      this._spinner.hide();
      this.imageUploadResponse = data;
      this.entity.userPhotoUrl = environment.uploadImageUrl + data.name;
      this.entity.userPhotoPath = data.url + "/" + data.name;

    }, (error) => {
      console.log(error);
      this._spinner.hide();
      this._toastr.error(error.Message);
    });
  }

  goBack() {
    this._location.back();
  }

}
