import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetSmsFeatureByOidRequest } from '../../request/sms/get-sms-feature-by-oid-request';
import { GetSmsFeatureListRequest } from '../../request/sms/get-sms-feature-list-request';
import { SmsFeatureRequest } from '../../request/sms/sms-feature-request';
import { GetSmsFeatureByOidResponse } from '../../response/sms/get-sms-feature-by-oid-response copy';
import { GetSmsFeatureListResponse } from '../../response/sms/get-sms-feature-list-response';
import { SmsFeatureResponse } from '../../response/sms/sms-feature-response';

@Injectable({
  providedIn: 'root'
})
export class SmsFeature {

  constructor(private httpClient: HttpClient) { }

  getInstituteSmsFeatureList(request: GetSmsFeatureListRequest): Observable<GetSmsFeatureListResponse> {
    return this.httpClient.post<GetSmsFeatureListResponse>(`${environment.baseURL}${environment.GET_SMS_FEATURE_LIST}`, request)
  }

  getSmsFeatureByOid(request: GetSmsFeatureByOidRequest): Observable<GetSmsFeatureByOidResponse> {
    return this.httpClient.post<GetSmsFeatureByOidResponse>(`${environment.baseURL}${environment.GET_SMS_FEATURE_BY_OID}`, request)
  }

  updateSmsFeatureInfo(request: SmsFeatureRequest): Observable<SmsFeatureResponse> {
    return this.httpClient.post<SmsFeatureResponse>(`${environment.baseURL}${environment.UPDATE_SMS_FEATURE}`, request)
  }

  // saveSmsFeatureInfo(request: SmsFeatureRequest): Observable<SmsFeatureResponse> {
  //   return this.httpClient.post<SmsFeatureResponse>(`${environment.baseURL}${environment.SAVE_SMS_Feature}`, request)
  // }

}
