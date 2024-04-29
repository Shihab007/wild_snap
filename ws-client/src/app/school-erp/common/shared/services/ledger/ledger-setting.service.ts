import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetLedgerSettingByOidRequest } from '../../request/ledger/get-ledger-setting-by-oid-request';
import { GetLedgerSettingListRequest } from '../../request/ledger/get-ledger-setting-list-request';
import { UpdateLedgerSettingByOidRequest } from '../../request/ledger/update-ledger-setting-by-oid-request';
import { GetLedgerSettingByOidResponse } from '../../response/ledger/get-ledger-setting-by-oid-response';
import { GetLedgerSettingListResponse } from '../../response/ledger/get-ledger-setting-list-response';

@Injectable({
  providedIn: 'root'
})
export class LedgerSettingService {

  constructor(private httpClient: HttpClient) { }

  getLedgerSettingList(request: GetLedgerSettingListRequest): Observable<GetLedgerSettingListResponse> {
    return this.httpClient.post<GetLedgerSettingListResponse>(`${environment.baseURL}${environment.GET_LEDGER_SETTING_LIST}`, request)
  }

  getLedgerSettingByOid(request: GetLedgerSettingByOidRequest): Observable<GetLedgerSettingByOidResponse> {
    return this.httpClient.post<GetLedgerSettingByOidResponse>(`${environment.baseURL}${environment.GET_LEDGER_SETTING_BY_OID}`, request)
  }
  updateLedgerSettingByOid(request: UpdateLedgerSettingByOidRequest): Observable<GetLedgerSettingByOidResponse> {
    return this.httpClient.post<GetLedgerSettingByOidResponse>(`${environment.baseURL}${environment.UPDATE_LEDGER_SETTING}`, request)
  }
}
