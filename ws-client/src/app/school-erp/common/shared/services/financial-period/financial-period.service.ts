
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CloseFinancialPeriodRequest } from '../../request/accounting/financial-period/close-financial-period-request';
import { FinancialPeriodListRequest } from '../../request/accounting/financial-period/financial-period-list-request';
import { FinancialPeriodSaveRequest } from '../../request/accounting/financial-period/financial-period-save-request';
import { GetByOidCommonRequest } from '../../request/common/get-by-oid-common-request';
import { FinancialPeriodListResponse } from '../../response/accounting/financial-period/financial-period-list-response';
import { GetFinancialPeriodByOidResponse } from '../../response/accounting/financial-period/get-financial-period-by-oid-response';
import { CommonSaveOrUpdateResponse } from '../../response/common/common-save-or-update-response';

@Injectable({
  providedIn: 'root'
})
export class FinancialPeriodService {

  constructor(private httpClient: HttpClient) { }

  getFinancialPeriodList(request: FinancialPeriodListRequest): Observable<FinancialPeriodListResponse> {
    return this.httpClient.post<FinancialPeriodListResponse>(`${environment.baseURL}${environment.GET_FINANCIAL_PERIOD_LIST}`, request)
  }

  saveFinancialPeriod(request: FinancialPeriodSaveRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.SAVE_FINANCIAL_PERIOD}`, request)
  }

  updateFinancialPeriod(request: FinancialPeriodSaveRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.UPDATE_FINANCIAL_PERIOD}`, request)
  }


  getFinancialPeriodByOid(request: GetByOidCommonRequest): Observable<GetFinancialPeriodByOidResponse> {
    return this.httpClient.post<GetFinancialPeriodByOidResponse>(`${environment.baseURL}${environment.GET_FINANCIAL_PERIOD_BY_OID}`, request)
  }

  closeFinancialPeriod(request: CloseFinancialPeriodRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.CLOSE_FINANCIAL_PERIOD_BY_OID}`, request)
  }


}
