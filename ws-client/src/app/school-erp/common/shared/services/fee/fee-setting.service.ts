import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeeSettingByFeeCodeRequest } from '../../request/fee/fee-setting-by-fee-code-request';
import { FeeSettingDetailRequest } from '../../request/fee/fee-setting-detail-request';
import { CheckAdmissionFeesSettingRequest } from '../../request/fees/admission-fees/check-admission-fees-setting-request';
import { FeeSettingByFeeCodeResponse } from '../../response/fee/fee-setting-by-fee-code-response';
import { FeeSettingDetailResponse } from '../../response/fee/fee-setting-detail-response';
import { CheckAdmissionFeesSettingResponse } from '../../response/fees/admission-fees/check-admission-fees-setting-response';

@Injectable({
  providedIn: 'root'
})
export class FeeSettingService {

  constructor(private httpClient: HttpClient) { }



  getFeeSettingDetail(request: FeeSettingDetailRequest): Observable<FeeSettingDetailResponse> {
    return this.httpClient.post<FeeSettingDetailResponse>(`${environment.baseURL}${environment.GET_FEES_SETTING_DETAIL_BY_INSTITUTE_AND_CLASS_OID}`, request)
  }

  checkAdmissionFeesSetting(request: CheckAdmissionFeesSettingRequest): Observable<CheckAdmissionFeesSettingResponse> {
    return this.httpClient.post<CheckAdmissionFeesSettingResponse>(`${environment.baseURL}${environment.GET_FEE_SETTING_LIST}`, request)
  }

  getFeeSettingByFeeCode(request: FeeSettingByFeeCodeRequest): Observable<FeeSettingByFeeCodeResponse> {
    return this.httpClient.post<FeeSettingByFeeCodeResponse>(`${environment.baseURL}${environment.FEE_SETTING_BY_FEE_CODE}`, request)
  }

}
