import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EmailRegEx, mobileNoRegEx } from 'src/app/common/constant/constant';
import { DropdownData } from 'src/app/common/constant/dropdown-data';
import { bloodGroupList, religionList } from 'src/app/common/constant/list-status';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/wild-snap/common/shared/header/request-header';
import { ClassGroupDetails } from 'src/app/wild-snap/common/shared/model/class-group/class-group-details';
import { DataList } from 'src/app/wild-snap/common/shared/model/common/data-list';
import { DistrictList } from 'src/app/wild-snap/common/shared/model/district/district-list';
import { InstituteClassEntity } from 'src/app/wild-snap/common/shared/model/institute/institute-class-entity';
import { InstituteList } from 'src/app/wild-snap/common/shared/model/institute/institute-list';

import { AppClassGroupService } from 'src/app/wild-snap/common/shared/services/class-group/app-class-group.service';
import { ClassService } from 'src/app/wild-snap/common/shared/services/class/class.service';
import { DistrictService } from 'src/app/wild-snap/common/shared/services/district/district.service';
import { ThanaService } from 'src/app/wild-snap/common/shared/services/thana/thana.service';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { RegistrationFormService } from './service/admission-form.service';
import { NgxImageCompressService } from 'ngx-alldone-image-compress';
import { BANGLA_REGEX, EMAIL_REGEX, MOBILE_NO_REGEX_V2, NAME_REGEX, NUMBER_REGEX, POST_CODE_REGEX } from 'src/app/common/constant/reg-constant';
import { RegistrationFormRequestBody } from './model/admission-form-request-body';
import { RegistrationFormRequest } from './model/admission-form-request';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})
export class AdmissionFormComponent implements OnInit {

  public minDateOfBirth: Date;
  public maxDateOfBirth: Date;
  public isAddressSameAsChecked = true;
  public isShowForm = true;
  public isShowSuccessMsg = false;

  public isShowNotificationMessage: boolean;
  public notificationMessage: string;
  public notificationDelay: number = 5000;
  public notificationType: string;
  public isShowPhotoResizeLink: boolean;


  public locale: any;


  public mobileNoPattern = mobileNoRegEx;
  public emailPattern = EmailRegEx;

  public namePattern = NAME_REGEX;
  public banglaPattern = BANGLA_REGEX;
  public numberPattern = NUMBER_REGEX;
  public mobileNumPattern = MOBILE_NO_REGEX_V2;
  public mailPattern = EMAIL_REGEX;
  public postCodePattern = POST_CODE_REGEX;



  @ViewChild('endowmentAppForm') endowmentAppForm: NgForm;
  // @ViewChild('applicantNameBn') applicantNameBn: any;
  @ViewChild('applicantNameEn') applicantNameEn: any;
  @ViewChild('email') email: any;
  @ViewChild('mobileNo') mobileNo: any;


  constructor(
    private registrationFormService: RegistrationFormService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private imageCompress: NgxImageCompressService
  ) { }

  public requestHeader: RequestHeader = new RequestHeader();



  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });
  }


  public header: Header = new Header();

  public registrationFormRequest: RegistrationFormRequest = new RegistrationFormRequest();
  public entity: RegistrationFormRequestBody = new RegistrationFormRequestBody();

  checkAndSubmitApplication() {
    if (!this.isValidData()) {
      return;
    }

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.registrationFormRequest.header = this.requestHeader;
    this.registrationFormRequest.body = this.entity;
    // this.registrationFormRequest.body.status = 'Submitted';

    if (this.entity != null) {
      this.registrationFormService.submitUserRegistrationForm(this.registrationFormRequest).subscribe(resData => {
        if (resData.header.responseCode == '200') {
          this.isShowForm = false;
          this.isShowSuccessMsg = true;
        }
      });
    }

  }


  isValidData() {

    if (!this.entity.nameEn.match(this.namePattern)) {
      this.toastr.error('Please! Check Name in English');
      this.applicantNameEn.nativeElement.focus();
      return false;
    }
    // if (!this.entity.applicantNameBn) {
    //   this.toastr.error('Please! Check Name in Bangla');
    //   this.applicantNameBn.nativeElement.focus();
    //   return false;
    // }

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

    if (this.entity.email) {
      if (!this.entity.email.match(this.emailPattern)) {
        this.toastr.error('Please! Enter valid Email');
        this.email.nativeElement.focus();
        return false;
      }
    }

    return true;
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
