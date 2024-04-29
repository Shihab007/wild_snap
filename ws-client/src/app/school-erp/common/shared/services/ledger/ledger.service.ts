import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetByOidCommonRequest } from '../../request/common/get-by-oid-common-request';
import { GetLedgerComboListRequst } from '../../request/ledger/get-ledger-combo-list-requst';
import { GetLedgerListRequest } from '../../request/ledger/get-ledger-list-request';
import { SaveLedgerRequest } from '../../request/ledger/save-ledger-request';
import { CommonSaveOrUpdateResponse } from '../../response/common/common-save-or-update-response';
import { GetLedgerByOidResponse } from '../../response/ledger/get-ledger-by-oid-response';
import { GetLedgerComboListResponse } from '../../response/ledger/get-ledger-combo-list-response';
import { GetLedgerListResponse } from '../../response/ledger/get-ledger-list-response';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  constructor(private httpClient: HttpClient) { }

  getLedgerList(request: GetLedgerListRequest): Observable<GetLedgerListResponse> {
    return this.httpClient.post<GetLedgerListResponse>(`${environment.baseURL}${environment.GET_LEDGER_LIST}`, request)
  }

  getLedgerComboList(request: GetLedgerComboListRequst): Observable<GetLedgerComboListResponse> {
    return this.httpClient.post<GetLedgerComboListResponse>(`${environment.baseURL}${environment.GET_LEDGER_COMBO_LIST}`, request)
  }


  getLedgerByOid(request: GetByOidCommonRequest): Observable<GetLedgerByOidResponse> {
    return this.httpClient.post<GetLedgerByOidResponse>(`${environment.baseURL}${environment.GET_LEDGER_BY_OID}`, request)
  }

  saveLedger(request: SaveLedgerRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.SAVE_LEDGER}`, request)
  }

  updateLedger(request: SaveLedgerRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.UPDATE_LEDGER}`, request)
  }
}
