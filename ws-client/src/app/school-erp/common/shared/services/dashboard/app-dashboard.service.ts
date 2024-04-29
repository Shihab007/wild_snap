import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GuardianDashboardInfoRequest } from '../../request/dashboard/guardian/guardian-dashboard-info-request';
import { InstituteDashboardInfoRequest } from '../../request/dashboard/school/institute-dashboard-info-request';
import { StudentDashboardInfoRequest } from '../../request/dashboard/student/student-dashboard-info-request';
import { ChildListRequest } from '../../request/guardian/child-list-request';
import { GuardianDashboardInfoResponse } from '../../response/dashboard/guardian/guardian-dashboard-info-response';
import { InstituteDashboardInfoResponse } from '../../response/dashboard/school/institute-dashboard-info-response';
import { StudentDashboardInfoResponse } from '../../response/dashboard/student/student-dashboard-info-response';
import { ChildListResponse } from '../../response/guardian/child-list-response';
import { StudentAppDashboardInfoRequest } from '../../request/dashboard/student/student-app-dashboard-info-request';
import { StudentAppDashboardInfoResponse } from '../../response/dashboard/student/student-app-dashboard-info-response';

@Injectable({
  providedIn: 'root'
})
export class AppDashboardService {

  constructor(private httpClient: HttpClient) { }

  getInstituteDashboardInfo(request: InstituteDashboardInfoRequest): Observable<InstituteDashboardInfoResponse> {
    return this.httpClient.post<InstituteDashboardInfoResponse>(
      `${environment.baseURL}${environment.instituteDashboardInfo}`, request);
  }


  getStudentDashboardInfo(request: StudentDashboardInfoRequest): Observable<StudentDashboardInfoResponse> {
    return this.httpClient.post<StudentDashboardInfoResponse>(
      `${environment.baseURL}${environment.studentDashboardInfo}`, request);
  }

  getAppStudentDashboardInfo(request: StudentAppDashboardInfoRequest): Observable<StudentAppDashboardInfoResponse> {
    return this.httpClient.post<StudentAppDashboardInfoResponse>(
      `${environment.baseURL}${environment.studentAppDashboardInfo}`, request);
  }

  getGuardianDashboardInfo(request: GuardianDashboardInfoRequest): Observable<GuardianDashboardInfoResponse> {
    return this.httpClient.post<GuardianDashboardInfoResponse>(
      `${environment.baseURL}${environment.guardianDashboardInfo}`, request);
  }
  getChildList(request: ChildListRequest): Observable<ChildListResponse> {
    return this.httpClient.post<ChildListResponse>(`${environment.baseURL}${environment.childList}`, request)
  }
}
