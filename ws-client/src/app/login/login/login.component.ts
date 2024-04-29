import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CountdownComponent } from 'ngx-countdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { agentClusterOidStoreKey, branchOidStoreKey, branchStoreKey, clusterOidStoreKey, cspOidStoreKey, cspStoreKey, emailStoreKey, employeeId, employeeName, employeeOid, loginCookieStoreKey, loginOidStoreKey, mobileNoStoreKey, reportJsonCookieStoreKey, roleIdStoreKey, userIdStoreKey, userNameStoreKey, USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { SendOtpRequest } from 'src/app/school-erp/common/shared/request/otp/send-otp-request';
import { SendOtpRequestBody } from 'src/app/school-erp/common/shared/request/otp/send-otp-request-body';
import { VerifyOtpRequest } from 'src/app/school-erp/common/shared/request/otp/verify-otp-request';
import { VerifyOtpRequestBody } from 'src/app/school-erp/common/shared/request/otp/verify-otp-request-body';
import { CommonChangePasswordRequest } from 'src/app/school-erp/common/shared/request/password/common-change-password-request';
import { CommonChangePasswordRequestBody } from 'src/app/school-erp/common/shared/request/password/common-change-password-request-body';
import { VerifyOtpResponse } from 'src/app/school-erp/common/shared/response/otp/verify-otp-response';
import { VerifyOtpResponseBody } from 'src/app/school-erp/common/shared/response/otp/verify-otp-response-body';
import { OtpService } from 'src/app/school-erp/common/shared/services/otp/otp.service';
import { CommomChangePasswordService } from 'src/app/school-erp/common/shared/services/password/commom-change-password.service';
import { AppStorageService } from '../auth/app-storage.service';
import { AuthService } from '../auth/auth.service';
import { LoginRequest } from '../shared/model/login-request';
import { LoginRequestBody } from '../shared/model/login-request-body';
import { LoginRequestHeader } from '../shared/model/login-request-header';
import { LoginResponse } from '../shared/model/login-response';
import { LoginResponseBody } from '../shared/model/login-response-body';
import { LoginResponseHeader } from '../shared/model/login-response-header';
import { OtpConfig } from '../shared/model/otp-config';
import { UserInfo } from '../shared/model/user-info';
import { LoginService } from '../shared/services/login.service';
declare var $: any;

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username') username: any;
  @ViewChild('newPassword') newPassword: any;
  @ViewChild('confirmNewPassword') confirmNewPassword: any;
  @ViewChild('loginId') loginId: any;
  @ViewChild('loginPassword') loginPassword: any;


  userInfo: UserInfo = new UserInfo();

  public countDownTime = "300";
  public countDownConfig: any;
  public otp: string;
  public showWrongOtpMessage = false;
  public showResendOtpMessage = false;
  public showOtpComponent = true;
  public otpVerifyMessage = "";
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  @ViewChild('otpCountDown', { static: false }) private countdown: CountdownComponent;

  isLoading = false;
  isError: boolean;

  isShowLogin: boolean;
  isShowForgotPassword: boolean;
  isShowOtpVerification: boolean;
  isShowChangePassword: boolean;

  notificationType: string;
  notificationMessage: string;
  notificationDelay: number = 2500;
  isShowNotificationMessage: boolean;

  isShowLoginIdInput = false;
  isShowEmailInput = false;
  isShowResetPasswordButton = false;

  loginRequestBody: LoginRequestBody;
  loginRequestHeader: LoginRequestHeader;
  loginRequest: LoginRequest;

  loginResponseBody: LoginResponseBody;
  loginResonseHeader: LoginResponseHeader;
  loginResponse: LoginResponse;

  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();
  public verifyOtpResponse: VerifyOtpResponse = new VerifyOtpResponse();
  public verifyOtpResponseBody: VerifyOtpResponseBody = new VerifyOtpResponseBody();

  constructor(private service: LoginService,
    private route: Router,
    private _appStorageService: AppStorageService,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,

    private _otpService: OtpService,
    private commonChangePasswordService: CommomChangePasswordService,
    private activatedRoute: ActivatedRoute) {
    translate.setDefaultLang('bn');
  }


  changeLanguage(lan: string) {
    this.translate.use(lan);
    this.setActiveLanguageLink();
  }

  setActiveLanguageLink() {
    if (this.translate.currentLang === 'en') {
      $('#englishLangLink').addClass("active");
      $('#banglaLangLink').removeClass("active");
      document.documentElement.setAttribute('lang', 'en');
    }
    else if (this.translate.currentLang === 'bn') {
      $('#banglaLangLink').addClass("active");
      $('#englishLangLink').removeClass("active");
      document.documentElement.setAttribute('lang', 'bn');
    }
  }

  ngOnInit(): void {
    this.isShowLogin = true;
    this.isShowForgotPassword = false;
    this.isShowForgotPassword = false;
    this.loginRequest = new LoginRequest();
    this.loginRequestBody = new LoginRequestBody();
  }


  //CHANGE PASSWORD START
  // isValidData() {

  //   if (!this.changePasswordRequestody.newPassword) {
  //     this.notificationType = 'danger';
  //     this.isShowNotificationMessage = true;
  //     this.notificationMessage = 'Please! Enter New Password';
  //     this.newPassword.nativeElement.focus();
  //     setTimeout(() => {
  //       this.isShowNotificationMessage = false;
  //     }, this.notificationDelay);
  //     return false;
  //   }
  //   if (!this.changePasswordRequestody.confirmNewPassword) {
  //     this.notificationType = 'danger';
  //     this.isShowNotificationMessage = true;
  //     this.notificationMessage = 'Please! Enter Confirm New Password';
  //     this.confirmNewPassword.nativeElement.focus();
  //     setTimeout(() => {
  //       this.isShowNotificationMessage = false;
  //     }, this.notificationDelay);
  //     return false;
  //   }
  //   return true;
  // }

  // public passwordLength: number;
  // public minPasswordLength: number = 6;
  // isValidNewPassword() {
  //   this.passwordLength = this.changePasswordRequestody.newPassword.length;
  //   if (this.passwordLength < this.minPasswordLength) {
  //     this.notificationType = 'danger';
  //     this.isShowNotificationMessage = true;
  //     setTimeout(() => {
  //       this.isShowNotificationMessage = false;
  //     }, this.notificationDelay);
  //     this.notificationMessage = 'New Password must contain ' + this.minPasswordLength + ' charecters';
  //     return;
  //   }
  //   if (this.changePasswordRequestody.confirmNewPassword) {
  //     if (this.changePasswordRequestody.newPassword != this.changePasswordRequestody.confirmNewPassword) {
  //       this.notificationType = 'danger';
  //       this.isShowNotificationMessage = true;
  //       setTimeout(() => {
  //         this.isShowNotificationMessage = false;
  //       }, this.notificationDelay);
  //       this.notificationMessage = 'New Password And Confirm New Password does not match';
  //       return false;
  //     }
  //     else {
  //       return true;
  //     }
  //   }
  // }

  // isValidConfirmNewPassword() {
  //   if (this.passwordLength < this.minPasswordLength) {
  //     this.notificationType = 'danger';
  //     this.isShowNotificationMessage = true;
  //     setTimeout(() => {
  //       this.isShowNotificationMessage = false;
  //     }, this.notificationDelay);
  //     this.notificationMessage = 'New Password must contain ' + this.minPasswordLength + ' charecters';
  //     this.newPassword.nativeElement.focus();
  //     return;
  //   }
  //   if (this.changePasswordRequestody.newPassword != this.changePasswordRequestody.confirmNewPassword) {

  //     this.notificationType = 'danger';
  //     this.isShowNotificationMessage = true;
  //     setTimeout(() => {
  //       this.isShowNotificationMessage = false;
  //     }, this.notificationDelay);
  //     this.notificationMessage = 'New Password And Confirm New Password does not match';
  //     return false;
  //   }
  //   else if (!this.changePasswordRequestody.newPassword) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }



  // changePasswordRequest: CommonChangePasswordRequest = new CommonChangePasswordRequest();
  // changePasswordRequestody: CommonChangePasswordRequestBody = new CommonChangePasswordRequestBody();
  // changePassword() {
  //   if (!this.isValidData()) {
  //     return;
  //   }

  //   this.changePasswordRequest.body = this.changePasswordRequestody;
  //   this.changePasswordRequest.body.loginId = this.sendOtpRequestBody.loginId;
  //   this.changePasswordRequest.body.email = this.sendOtpRequestBody.email;
  //   this.changePasswordRequest.body.oldPassword = "_$change_$password_$by_$otp_$or_$email";

  //   console.log(this.sendOtpRequest.body);


  //   this.commonChangePasswordService.changePasswordByOtp(this.changePasswordRequest).subscribe(data => {
  //     if (data.header.responseCode == '200') {
  //       this.notificationType = 'success';
  //       this.isShowNotificationMessage = true;
  //       this.notificationMessage = data.header.remarks.toString();
  //       this.isShowChangePassword = false;
  //       this.isShowLogin = true;
  //       setTimeout(() => {
  //         this.isShowNotificationMessage = false;
  //         this.logout();
  //       }, this.notificationDelay);


  //     } else {
  //       this.notificationType = 'danger';
  //       this.isShowNotificationMessage = true;
  //       this.notificationMessage = data.header.remarks.toString();
  //       setTimeout(() => {
  //         this.isShowNotificationMessage = false;
  //       }, this.notificationDelay);
  //     }
  //     // this.goToDueFeesViewPage();
  //   });
  // }

  logout(): void {
    this.authService.logout();
  }
  //CHANGE PASSWORD END



  toggleLoading = () => {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  ngAfterViewInit() {
    setTimeout(() => this.setActiveLanguageLink());
  }

  isValidLoginData() {

    if (!this.loginRequestBody.loginId) {
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;
      this.notificationMessage = 'Please! Enter Login Id';
      this.loginId.nativeElement.focus();
      setTimeout(() => {
        this.isShowNotificationMessage = false;
      }, this.notificationDelay);
      return false;
    }
    if (!this.loginRequestBody.password) {
      this.notificationType = 'danger';
      this.isShowNotificationMessage = true;
      this.notificationMessage = 'Please! Enter Password';
      this.loginPassword.nativeElement.focus();
      setTimeout(() => {
        this.isShowNotificationMessage = false;
      }, this.notificationDelay);
      return false;
    }
    return true;
  }

  Submit() {
    this.router.navigate(["/wild-snap/dashboard"]);

    if (!this.isValidLoginData()) {
      return;
    }

    this.loginRequestHeader = new LoginRequestHeader();

    this.loginRequestHeader.requestId = this.header.requestId;
    this.loginRequestHeader.requestDateTime = this.header.requestDateTime;
    this.loginRequestHeader.requestSource = this.header.requestSource;
    this.loginRequestHeader.requestServiceSource = this.header.requestServiceSource;

    this.loginResponse = new LoginResponse();


    this.loginRequest.body = this.loginRequestBody;
    this.loginRequest.body.loginId = this.loginRequestBody.loginId.trim();
    this.loginRequest.header = this.loginRequestHeader;
    this.loginResponseBody = new LoginResponseBody();


    this.service.getUsers(this.loginRequest).subscribe(resData => {
      this.authService.loginResponseBody = resData.body;

      this.isError = false;


      if (resData.header.responseCode != '200' && resData.header.status == 'Failed') {
        this.toastr.error('Failed to login by this Login ID/Username and Password');
      }
    }, error => {
      this.isError = true;
      throwError(error);
      // this.toastr.error(error.message);
      // this.toastr.error("Username or Password Incorrect");
    });

  }

  goToForgotPassword() {
    this.sendOtpRequestBody.loginId = null;
    this.isShowLoginIdInput = false;
    this.sendOtpRequestBody.email = null;
    this.isShowEmailInput = false;
    this.isShowLogin = false;
    this.isShowForgotPassword = true;
  }

  goToLogin() {
    this.isShowLogin = true;
    this.isShowForgotPassword = false;
  }

  sendOtpRequest: SendOtpRequest = new SendOtpRequest();
  sendOtpRequestBody: SendOtpRequestBody = new SendOtpRequestBody();

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }


  config: OtpConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };






  selectLoginId() {
    this.isShowLoginIdInput = true;
    this.isShowEmailInput = false;
    this.isShowResetPasswordButton = true;
    this.sendOtpRequestBody.email = null;

  }
  selectEmail() {
    this.isShowLoginIdInput = false;
    this.isShowEmailInput = true;
    this.isShowResetPasswordButton = true;
    this.sendOtpRequestBody.loginId = null;
  }


}