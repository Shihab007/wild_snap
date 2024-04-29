import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeriodCreateRequest } from '../../request/settings/period-create-request';
import { PeriodListRequest } from '../../request/settings/period-list-request';
import { PeriodCreateResponse } from '../../response/settings/period-create-response';
import { PeriodListResponse } from '../../response/settings/period-list-response';

@Injectable({
  providedIn: 'root'
})
export class AppPeriodListService {

  constructor(private httpClient: HttpClient) { }

  getPeriodList(request: PeriodListRequest): Observable<PeriodListResponse> {
    return this.httpClient.post<PeriodListResponse>(`${environment.baseURL}${environment.GET_CLASS_PERIOD_LIST}`, request)
  }
  savePeriod(request: PeriodCreateRequest): Observable<PeriodCreateResponse> {
    debugger;
    return this.httpClient.post<PeriodCreateResponse>(`${environment.baseURL}${environment.CLASS_PERIOD_EDIT_LIST
      }`, request);
  }
}
