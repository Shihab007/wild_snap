import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonChangePasswordRequest } from '../../request/password/common-change-password-request';
import { CommonChangePasswordResponse } from '../../response/password/common-change-password-response';

@Injectable({
  providedIn: 'root'
})
export class CommomChangePasswordService {

  constructor(private httpClient: HttpClient) { }

  changePassword(request: CommonChangePasswordRequest): Observable<CommonChangePasswordResponse> {
    return this.httpClient.post<CommonChangePasswordResponse>(`${environment.baseURL}${environment.changePassword}`, request)
  }

  changePasswordByOtp(request: CommonChangePasswordRequest): Observable<CommonChangePasswordResponse> {
    return this.httpClient.post<CommonChangePasswordResponse>(`${environment.baseURL}${environment.USER_CHANGE_PASSWORD_BY_OTP}`, request)
  }
}
