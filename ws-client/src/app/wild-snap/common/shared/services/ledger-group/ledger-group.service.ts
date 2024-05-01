import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LedgerGroupListRequest } from '../../request/accounting/ledger-group/ledger-group-list-request';
import { GetLedgerComboListRequst } from '../../request/ledger/get-ledger-combo-list-requst';
import { GetLedgerListRequest } from '../../request/ledger/get-ledger-list-request';
import { LedgerGroupListResponse } from '../../response/accounting/ledger-group/ledger-group-list-response';
import { GetLedgerComboListResponse } from '../../response/ledger/get-ledger-combo-list-response';
import { GetLedgerListResponse } from '../../response/ledger/get-ledger-list-response';

@Injectable({
  providedIn: 'root'
})
export class LedgerGroupService {

  constructor(private httpClient: HttpClient) { }

  getLedgerGroupList(request: LedgerGroupListRequest): Observable<LedgerGroupListResponse> {
    return this.httpClient.post<LedgerGroupListResponse>(`${environment.baseURL}${environment.GET_LEDGER_GROUP_LIST}`, request)
  }


}

