import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetSubLedgerComboListRequest } from '../../request/accounting/sub-ledger/get-sub-ledger-combo-list-request';
import { GetSubLedgerListRequest } from '../../request/accounting/sub-ledger/get-sub-ledger-list-request';
import { GetSubLedgerComboListResponse } from '../../response/accounting/sub-ledger/get-sub-ledger-combo-list-response';
import { GetSubLedgerListResponse } from '../../response/accounting/sub-ledger/get-sub-ledger-list-response';

@Injectable({
  providedIn: 'root'
})
export class SubLedgerService {

  constructor(private httpClient: HttpClient) { }

  getSubLedgerList(request: GetSubLedgerListRequest): Observable<GetSubLedgerListResponse> {
    return this.httpClient.post<GetSubLedgerListResponse>(`${environment.baseURL}${environment.GET_SUB_LEDGER_LIST}`, request)
  }

  getSubLedgerComboList(request: GetSubLedgerComboListRequest): Observable<GetSubLedgerComboListResponse> {
    return this.httpClient.post<GetSubLedgerComboListResponse>(`${environment.baseURL}${environment.GET_SUB_LEDGER_COMBO_LIST}`, request)
  }
}
