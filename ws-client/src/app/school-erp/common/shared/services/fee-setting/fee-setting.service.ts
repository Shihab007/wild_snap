import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeeSettingEntity } from '../../model/fee-setting/fee-setting-entity';
import { GetByOidCommonRequest } from '../../request/common/get-by-oid-common-request';
import { CreateFeeSettingRequest } from '../../request/fee-setting/create-fee-setting-request';
import { GetFeeSettingByFeeCodeRequest } from '../../request/fee-setting/get-fee-setting-by-fee-code-request';
import { GetFeeSettingListRequest } from '../../request/fee-setting/get-fee-setting-list-request';
import { CreateFeeSettingReponse } from '../../response/fee-setting/create-fee-setting-reponse';
import { GetFeeSettingByOidReponse } from '../../response/fee-setting/get-fee-setting-by-oid-reponse';
import { GetFeeSettingListReponse } from '../../response/fee-setting/get-fee-setting-list-reponse';

@Injectable({
  providedIn: 'root'
})
export class FeeSettingService {

  constructor(private httpClient: HttpClient) { }

  createFeeSetting(request: CreateFeeSettingRequest): Observable<CreateFeeSettingReponse> {
    return this.httpClient.post<CreateFeeSettingReponse>(`${environment.baseURL}${environment.CREATE_FEE_SETTING}`, request)
  }

  updateFeeSetting(request: CreateFeeSettingRequest): Observable<CreateFeeSettingReponse> {
    return this.httpClient.post<CreateFeeSettingReponse>(`${environment.baseURL}${environment.UPDATE_FEE_SETTING}`, request)
  }

  getFeeSettingList(request: GetFeeSettingListRequest): Observable<GetFeeSettingListReponse> {
    return this.httpClient.post<GetFeeSettingListReponse>(`${environment.baseURL}${environment.GET_FEE_SETTING_LIST}`, request)
  }

  getFeeSettingByOid(request: GetByOidCommonRequest): Observable<GetFeeSettingByOidReponse> {
    return this.httpClient.post<GetFeeSettingByOidReponse>(`${environment.baseURL}${environment.GET_FEE_SETTING_BY_OID}`, request)
  }

  getFeeSettingByFeeCode(request: GetFeeSettingByFeeCodeRequest): Observable<GetFeeSettingByOidReponse> {
    return this.httpClient.post<GetFeeSettingByOidReponse>(`${environment.baseURL}${environment.GET_FEE_SETTING_BY_FEE_CODE}`, request)
  }
}
