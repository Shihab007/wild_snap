import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SendOtpRequest } from '../../request/otp/send-otp-request';
import { VerifyOtpRequest } from '../../request/otp/verify-otp-request';
import { SendOtpResponse } from '../../response/otp/send-otp-response';
import { VerifyOtpResponse } from '../../response/otp/verify-otp-response';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private httpClient: HttpClient) { }

  sendOtpByLoginId(request: SendOtpRequest): Observable<SendOtpResponse> {
    return this.httpClient.post<SendOtpResponse>(`${environment.baseURL}${environment.COMMON_SEND_OTP_BY_LOGIN_ID_API_V1}`, request)
  }

  resendOtpByLoginId(request: SendOtpRequest): Observable<SendOtpResponse> {
    return this.httpClient.post<SendOtpResponse>(`${environment.baseURL}${environment.COMMON_RESEND_OTP_BY_LOGIN_ID_API_V1}`, request)
  }

  verifyOtpByLoginId(request: VerifyOtpRequest): Observable<VerifyOtpResponse> {
    return this.httpClient.post<VerifyOtpResponse>(`${environment.baseURL}${environment.COMMON_VERIFY_OTP_BY_LOGIN_ID_API_V1}`, request)
  }
}
