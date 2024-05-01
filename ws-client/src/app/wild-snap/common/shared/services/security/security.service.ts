import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetProfileByLoginIdRequest } from '../../request/security/get-profile-by-login-id-request';
import { UpdateProfileByLoginIdRequest } from '../../request/security/update-profile-by-login-id-request';
import { GetProfileByLoginIdResponse } from '../../response/security/get-profile-by-login-id-response';
import { UpdateProfileByLoginIdResponse } from '../../response/security/update-profile-by-login-id-response';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }

  getProfileByLoginId(getProfileByLoginIdRequest: GetProfileByLoginIdRequest): Observable<GetProfileByLoginIdResponse> {
    return this.httpClient.post<GetProfileByLoginIdResponse>(
      `${environment.baseURL}${environment.GET_PROFILE_BY_LOGIN_ID}`, getProfileByLoginIdRequest);
  }

  updateProfileByLoginId(updateProfileByLoginIdRequest: UpdateProfileByLoginIdRequest): Observable<UpdateProfileByLoginIdResponse> {
    return this.httpClient.post<UpdateProfileByLoginIdResponse>(
      `${environment.baseURL}${environment.UPDATE_PROFILE_BY_LOGIN_ID}`, updateProfileByLoginIdRequest);
  }


}
