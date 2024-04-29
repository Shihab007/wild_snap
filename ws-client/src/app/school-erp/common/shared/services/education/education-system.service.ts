import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminEducationSystemCreateRequest } from '../../request/education-system/admin-education-system-create-request';
import { AdminEducationSystemUpdateRequest } from '../../request/education-system/admin-education-system-update-request';
import { AdminEducationSystemViewRequest } from '../../request/education-system/admin-education-system-view-request';
import { EducationSystemListRequest } from '../../request/education/education-system-list-request';
import { AdminEducationSystemCreateResponse } from '../../response/education-system/admin-education-system-create-response';
import { AdminEducationSystemUpdateResponse } from '../../response/education-system/admin-education-system-update-response';
import { AdminEducationSystemViewResponse } from '../../response/education-system/admin-education-system-view-response';
import { EducationSystemListResponse } from '../../response/education/education-system-list-response';

@Injectable({
  providedIn: 'root'
})
export class EducationSystemService {

  constructor(private httpClient: HttpClient) { }

  educationSystemList(educationSystemListRequest: EducationSystemListRequest): Observable<EducationSystemListResponse> {
    return this.httpClient.post<EducationSystemListResponse>(`${environment.baseURL}${environment.educationSystemList}`, educationSystemListRequest)
  }

  getEducationSystemByOid(request: AdminEducationSystemViewRequest): Observable<AdminEducationSystemViewResponse> {
    return this.httpClient.post<AdminEducationSystemViewResponse>(`${environment.baseURL}${environment.educationSystemByOid}`, request)
  }

  createEducationSystem(request: AdminEducationSystemCreateRequest): Observable<AdminEducationSystemCreateResponse> {
    return this.httpClient.post<AdminEducationSystemCreateResponse>(`${environment.baseURL}${environment.saveEducationSystemByOid}`, request)
  }

  updateEducationSystem(request: AdminEducationSystemUpdateRequest): Observable<AdminEducationSystemUpdateResponse> {
    return this.httpClient.post<AdminEducationSystemUpdateResponse>(`${environment.baseURL}${environment.updateEducationSystem}`, request)
  }

}
