import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { ConstantService } from 'src/app/common/services/constant.service';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { AuthService } from 'src/app/login/auth/auth.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { CommonChangePasswordRequest } from 'src/app/wild-snap/common/shared/request/password/common-change-password-request';
import { CommonChangePasswordRequestBody } from 'src/app/wild-snap/common/shared/request/password/common-change-password-request-body';
import { CommomChangePasswordService } from 'src/app/wild-snap/common/shared/services/password/commom-change-password.service';

@Component({
  selector: 'app-common-change-password',
  templateUrl: './common-change-password.component.html',
  styleUrls: ['./common-change-password.component.scss']
})
export class CommonChangePasswordComponent implements OnInit {
  public notificationType: string;
  public notificationMessage: string;
  public notificationDelay: number = 2500;
  public isShowNotificationMessage: boolean;

  public userInfo: UserInfo = new UserInfo();

  @ViewChild('oldPassword') oldPassword: any;
  @ViewChild('newPassword') newPassword: any;
  @ViewChild('confirmNewPassword') confirmNewPassword: any;

  public locale: any;

  constructor(
    private _commonChangePasswordService: CommomChangePasswordService,
    private _toastr: ToastrService,
    private _route: Router,
    private _constantService: ConstantService,
    private _spinner: NgxSpinnerService,
    private _appStorageService: AppStorageService,
    private _authService: AuthService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(
      this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY)
    );
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });
  }

  isValidData() {
    if (!this.changePasswordRequestBody.oldPassword.trim()) {
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;
      if (this.locale == "en") {
        this.notificationMessage = 'Please! Enter Old Password';
      } else {
        this.notificationMessage = 'অনুগ্রহ করে! পুরানো পাসওয়ার্ড দিন';
      }
      this.oldPassword.nativeElement.focus();
      setTimeout(() => {
        this.isShowNotificationMessage = false;
      }, this.notificationDelay);
      return false;
    }
    if (!this.changePasswordRequestBody.newPassword.trim()) {
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;

      if (this.locale == "en") {
        this.notificationMessage = 'Please! Enter New Password';
      } else {
        this.notificationMessage = 'অনুগ্রহ করে! নতুন পাসওয়ার্ড দিন';
      }

      this.newPassword.nativeElement.focus();
      setTimeout(() => {
        this.isShowNotificationMessage = false;
      }, this.notificationDelay);
      return false;
    }
    if (!this.changePasswordRequestBody.confirmNewPassword.trim()) {
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;

      if (this.locale == "en") {
        this.notificationMessage = 'Please! Enter Confirm New Password';
      } else {
        this.notificationMessage = 'অনুগ্রহ করে! নতুন পাসওয়ার্ড নিশ্চিত করুন';
      }

      this.confirmNewPassword.nativeElement.focus();
      setTimeout(() => {
        this.isShowNotificationMessage = false;
      }, this.notificationDelay);
      return false;
    }
    return true;
  }
  public passwordLength: number;
  public minPasswordLength: number = 6;
  public minPasswordLengthBn: string = '৬';
  isValidNewPassword() {
    this.passwordLength = this.changePasswordRequestBody.newPassword.length;
    if (this.passwordLength < this.minPasswordLength) {
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;
      setTimeout(() => {
        this.isShowNotificationMessage = false;
      }, this.notificationDelay);

      if (this.locale == "en") {
        this.notificationMessage = 'New Password must contain ' + this.minPasswordLength + ' charecters';
      } else {
        this.notificationMessage = 'নতুন পাসওয়ার্ডে অবশ্যই ' + this.minPasswordLengthBn + ' টি অক্ষর থাকতে হবে';
      }
      return;
    }

    if (this.changePasswordRequestBody.confirmNewPassword) {
      if (this.changePasswordRequestBody.newPassword != this.changePasswordRequestBody.confirmNewPassword) {
        this.notificationType = 'danger';
        this.isShowNotificationMessage = true;
        setTimeout(() => {
          this.isShowNotificationMessage = false;
        }, this.notificationDelay);

        if (this.locale == "en") {
          this.notificationMessage = 'New Password And Confirm New Password does not match';
        } else {
          this.notificationMessage = 'নতুন পাসওয়ার্ড এবং কনফার্ম নতুন পাসওয়ার্ড মিলছে না';
        }

        return false;
      }
      else {
        return true;
      }
    }
  }

  isValidConfirmNewPassword() {
    if (this.passwordLength < this.minPasswordLength) {
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;
      setTimeout(() => {
        this.isShowNotificationMessage = false;
      }, this.notificationDelay);

      if (this.locale == "en") {
        this.notificationMessage = 'New Password must contain ' + this.minPasswordLength + ' charecters';
      } else {
        this.notificationMessage = 'নতুন পাসওয়ার্ডে অবশ্যই ' + this.minPasswordLengthBn + ' টি অক্ষর থাকতে হবে';
      }

      this.newPassword.nativeElement.focus();
      return;
    }
    if (this.changePasswordRequestBody.newPassword != this.changePasswordRequestBody.confirmNewPassword) {

      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;
      setTimeout(() => {
        this.isShowNotificationMessage = false;
      }, this.notificationDelay);

      if (this.locale == "en") {
        this.notificationMessage = 'New Password And Confirm New Password does not match';
      } else {
        this.notificationMessage = 'নতুন পাসওয়ার্ড এবং নিশ্চিত করুন নতুন পাসওয়ার্ড মেলে না';
      }
      return false;
    }
    else if (!this.changePasswordRequestBody.newPassword) {
      return false;
    }
    else {
      return true;
    }
  }



  changePasswordRequest: CommonChangePasswordRequest = new CommonChangePasswordRequest();
  changePasswordRequestBody: CommonChangePasswordRequestBody = new CommonChangePasswordRequestBody();
  changePassword() {
    if (!this.isValidData()) {
      return;
    }

    this.isValidConfirmNewPassword();

    this.changePasswordRequest.body = this.changePasswordRequestBody;
    this.changePasswordRequestBody.loginId = this.userInfo.loginId;

    this._commonChangePasswordService.changePasswordByOtp(this.changePasswordRequest).subscribe(data => {
      if (data.header.responseCode == '200') {
        this.notificationType = 'success';
        this.isShowNotificationMessage = true;

        if (this.locale == "en") {
          this.notificationMessage = data.header.remarks.toString();
        } else {
          this.notificationMessage = this.getBangla(data.header.remarks.toString());
        }

        this._spinner.show()
        setTimeout(() => {
          this.isShowNotificationMessage = false;
          this.logout();
        }, this.notificationDelay);
      } else {
        this.notificationType = 'danger';
        this.isShowNotificationMessage = true;

        if (this.locale == "en") {
          this.notificationMessage = data.header.remarks.toString();
        } else {
          this.notificationMessage = this.getBangla(data.header.remarks.toString());
        }

        setTimeout(() => {
          this.isShowNotificationMessage = false;
        }, this.notificationDelay);
      }
    });
  }


  getBangla(s: string) {
    if (s === "Sorry, The password is too short")
      return "দুঃখিত, পাসওয়ার্ডটি খুবই ছোট"
    else if (s === "Sorry, Your New Password and Confirm Password is not same !!!.")
      return "দুঃখিত, আপনার নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড এক নয়!!!";
    else if (s === "Password has been changed successfully")
      return "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে";
    else if (s === "Sorry, Your Old Password and New Password are Same !!!.")
      return "দুঃখিত, আপনার পুরানো পাসওয়ার্ড এবং নতুন পাসওয়ার্ড একই!!!";
    else if (s === "Sorry, Your Old Password Not Match !!!.")
      return "দুঃখিত, আপনার পুরানো পাসওয়ার্ড মেলে না!!!.";
    else if (s === "Sorry. Your password could not be updated successfully")
      return "দুঃখিত। আপনার পাসওয়ার্ড সফলভাবে আপডেট করা যায়নি";
  }


  logout(): void {
    this._authService.logout();
  }

  showPass: boolean = false;
  type: string = 'password';
  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
