import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SmsDashboardRequest } from '../../request/dashboard/school/sms-dashboard-request';
import { SmsDashboardResponse } from '../../response/dashboard/school/sms-dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class SmsDashboardService {

  constructor(private httpClient: HttpClient) { }

  getInstituteSmsDashboardInfo(request: SmsDashboardRequest): Observable<SmsDashboardResponse> {
    return this.httpClient.post<SmsDashboardResponse>(
      `${environment.baseURL}${environment.instituteSmsDashboardInfo}`, request);
  }

  getAdminSmsDashboardInfo(request: SmsDashboardRequest): Observable<SmsDashboardResponse> {
    return this.httpClient.post<SmsDashboardResponse>(
      `${environment.baseURL}${environment.GET_ADMIN_SMS_DASHBOARD}`, request);
  }

}
