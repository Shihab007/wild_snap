import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResetPasswordRequest } from '../../request/password/reset-password-request';
import { ResetPasswordResponse } from '../../response/password/reset-password-response';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient: HttpClient) { }

  //change url before calling
  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.httpClient.post<ResetPasswordResponse>(`${environment.baseURL}${environment.resetPassword}`, request)
  }
}
