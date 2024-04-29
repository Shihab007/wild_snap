
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LedgerSubGroupListRequest } from '../../request/accounting/ledger-sub-group/ledger-sub-group-list-request';
import { LedgerSubGroupSaveRequest } from '../../request/accounting/ledger-sub-group/ledger-sub-group-save-request';
import { GetByOidCommonRequest } from '../../request/common/get-by-oid-common-request';
import { LedgerSubGroupListResponse } from '../../response/accounting/ledger-sub-group/ledger-sub-group-list-response';
import { GetLedgerSubGroupByOidResponse } from '../../response/accounting/ledger-sub-group/get-ledger-sub-group-by-oid-response';
import { CommonSaveOrUpdateResponse } from '../../response/common/common-save-or-update-response';

@Injectable({
  providedIn: 'root'
})
export class LedgerSubGroupService {

  constructor(private httpClient: HttpClient) { }


  getLedgerSubGroupList(request: LedgerSubGroupListRequest): Observable<LedgerSubGroupListResponse> {
    return this.httpClient.post<LedgerSubGroupListResponse>(`${environment.baseURL}${environment.GET_LEDGER_SUB_GROUP_LIST}`, request)
  }

  saveLedgerSubGroup(request: LedgerSubGroupSaveRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.SAVE_LEDGER_SUB_GROUP}`, request)
  }

  updateLedgerSubGroup(request: LedgerSubGroupSaveRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.UPDATE_LEDGER_SUB_GROUP}`, request)
  }


  getLedgerSubGroupByOid(request: GetByOidCommonRequest): Observable<GetLedgerSubGroupByOidResponse> {
    return this.httpClient.post<GetLedgerSubGroupByOidResponse>(`${environment.baseURL}${environment.GET_LEDGER_SUB_GROUP_BY_OID}`, request)
  }


}
