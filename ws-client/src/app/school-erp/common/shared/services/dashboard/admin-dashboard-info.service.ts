import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminDashboardInfoRequest } from '../../../app-admin/app-admin-dashboard/Shared/request/admin-dashboard-info-request';
import { AdminDashboardInfoResponse } from '../../../app-admin/app-admin-dashboard/Shared/response/admin-dashboard-info-response';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardInfoService {

  constructor(private httpClient: HttpClient) { }

  getAdminDashboardInfo(request: AdminDashboardInfoRequest): Observable<AdminDashboardInfoResponse> {
    return this.httpClient.post<AdminDashboardInfoResponse>(
      `${environment.baseURL}${environment.GET_ADMIN_DASHBOARD_INFO}`, request);
  }

}
