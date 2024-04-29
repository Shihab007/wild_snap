import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeeHeadGroupByOidRequest } from '../../request/fee-head-group/fee-head-group-by-oid-request';
import { FeeHeadGroupListRequest } from '../../request/fee-head-group/fee-head-group-list-request';
import { FeeHeadGroupSaveRequest } from '../../request/fee-head-group/fee-head-group-save-request';
import { FeeHeadGroupByOidResponse } from '../../response/fee-head-group/fee-head-group-by-oid-response';
import { FeeHeadGroupListResponse } from '../../response/fee-head-group/fee-head-group-list-response';
import { FeeHeadGroupSaveResponse } from '../../response/fee-head-group/fee-head-group-save-response';

@Injectable({
  providedIn: 'root'
})
export class FeeHeadGroupService {

  constructor(private httpClient: HttpClient) {
  }

  feeHeadGroupList(request: FeeHeadGroupListRequest): Observable<FeeHeadGroupListResponse> {
    return this.httpClient.post<FeeHeadGroupListResponse>(`${environment.baseURL}${environment.GET_ALL_FEE_HEAD_GROUP_LIST}`, request)
  }

  feeHeadGroupByOid(request: FeeHeadGroupByOidRequest): Observable<FeeHeadGroupByOidResponse> {
    return this.httpClient.post<FeeHeadGroupByOidResponse>(`${environment.baseURL}${environment.GET_FEE_HEAD_GROUP_BY_OID}`, request)
  }

  saveFeeHeadGroup(request: FeeHeadGroupSaveRequest): Observable<FeeHeadGroupSaveResponse> {
    return this.httpClient.post<FeeHeadGroupSaveResponse>(`${environment.baseURL}${environment.CREATE_FEE_HEAD_GROUP}`, request)
  }

  updateFeeHeadGroup(request: FeeHeadGroupSaveRequest): Observable<FeeHeadGroupSaveResponse> {
    return this.httpClient.post<FeeHeadGroupSaveResponse>(`${environment.baseURL}${environment.UPDATE_FEE_HEAD_GROUP}`, request)
  }

}
