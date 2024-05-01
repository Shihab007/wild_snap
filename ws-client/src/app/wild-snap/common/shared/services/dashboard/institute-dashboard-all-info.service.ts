import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstituteDashboardAllInfoRequest } from '../../../app-user/app-school-dashboard/model/request/institute-dashboard-all-info-request';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstituteDashboardAllInfoResponse } from '../../../app-user/app-school-dashboard/model/response/institute-dashboard-all-info-response';


@Injectable({
  providedIn: 'root'
})
export class InstituteDashboardAllInfoService {

  constructor(private httpClient: HttpClient) { }

  getInstituteDashboardInfo(request: InstituteDashboardAllInfoRequest): Observable<InstituteDashboardAllInfoResponse> {
    return this.httpClient.post<InstituteDashboardAllInfoResponse>(
      `${environment.baseURL}${environment.GET_INSTITUTE_DASHBOARD_ALL_INFO}`, request);
  }

}
