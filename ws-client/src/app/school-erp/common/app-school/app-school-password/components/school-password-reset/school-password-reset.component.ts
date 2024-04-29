import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EmailRegEx } from 'src/app/common/constant/constant';
import { ResetPasswordRequest } from 'src/app/school-erp/common/shared/request/password/reset-password-request';
import { ResetPasswordRequestBody } from 'src/app/school-erp/common/shared/request/password/reset-password-request-body';
import { ResetPasswordService } from 'src/app/school-erp/common/shared/services/password/reset-password.service';

@Component({
  selector: 'app-school-password-reset',
  templateUrl: './school-password-reset.component.html',
  styleUrls: ['./school-password-reset.component.scss']
})
export class SchoolPasswordResetComponent implements OnInit {


  public locale: any;


  public isShowForm = true;
  public isShowSuccessMsg = false;

  public isShowLoginIdInput = false;
  public isShowEmailInput = false;
  public isShowResetPasswordButton = false;

  public emailPattern = EmailRegEx;
  constructor(
    private resetPasswordService: ResetPasswordService,
    private _toastr: ToastrService,
    private translate: TranslateService,
  ) { }

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

  resetPasswordRequest: ResetPasswordRequest = new ResetPasswordRequest();
  resetPasswordRequestbody: ResetPasswordRequestBody = new ResetPasswordRequestBody();


  resetPassword() {
    this.resetPasswordRequest.body = this.resetPasswordRequestbody;
    console.log(
      'Reset password Request'
    );
    console.log(this.resetPasswordRequest);


    this.resetPasswordService.resetPassword(this.resetPasswordRequest).subscribe(data => {
      console.log('Reset Password Response');
      console.log(data);
      if (data.header.responseCode == '200') {

        this.isShowForm = false;
        this.isShowSuccessMsg = true;
        this._toastr.success('Succesfully Reset Password');
      } else {

        this._toastr.error('Failed To Reset Password');
      }

    });
  }

  selectLoginId() {
    this.isShowLoginIdInput = true;
    this.isShowEmailInput = false;
    this.isShowResetPasswordButton = true;
    this.resetPasswordRequestbody.email = null;

  }
  selectEmail() {
    this.isShowLoginIdInput = false;
    this.isShowEmailInput = true;
    this.isShowResetPasswordButton = true;
    this.resetPasswordRequestbody.loginId = null;
  }

}