import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetByOidCommonRequest } from '../../request/common/get-by-oid-common-request';
import { AddInstituteGradingSystemRequest } from '../../request/education/add-institute-grading-system-request';
import { EducationGradingSystemListRequest } from '../../request/education/education-grading-system-list-request';
import { InstituteGradingSystemListRequest } from '../../request/institute/grading-system/institute-grading-system-list-request';
import { CommonSaveOrUpdateResponse } from '../../response/common/common-save-or-update-response';
import { EducationGradingSystemListResponse } from '../../response/education/education-grading-system-list-response';
import { GetInstituteGradingSystemByOidResponse } from '../../response/education/get-institute-grading-system-by-oid-response';
import { InstituteGradingSystemListResponse } from '../../response/institute/grading-system/institute-grading-system-list-response';

@Injectable({
  providedIn: 'root'
})
export class GradingSystemService {

  constructor(private httpClient: HttpClient) { }

  getInstituteGradingSystemList(request: InstituteGradingSystemListRequest): Observable<InstituteGradingSystemListResponse> {
    return this.httpClient.post<InstituteGradingSystemListResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_GRADING_SYSTEM_LIST}`, request)
  }


  addInstituteGradingSystem(addInstituteGradingSystemRequest: AddInstituteGradingSystemRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.CREATE_INSTITUTE_GRADING_SYSTEM}`, addInstituteGradingSystemRequest)
  }

  updateInstituteGradingSystem(addInstituteGradingSystemRequest: AddInstituteGradingSystemRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.EDIT_INSTITUTE_GRADING_SYSTEM}`, addInstituteGradingSystemRequest)
  }

  getInstituteGradingSystemByOid(getByOidCommonRequest: GetByOidCommonRequest): Observable<GetInstituteGradingSystemByOidResponse> {
    return this.httpClient.post<GetInstituteGradingSystemByOidResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_GRADING_SYSTEM_BY_OID}`, getByOidCommonRequest)
  }



  educationGradingSystemList(educationGradingSystemListRequest: EducationGradingSystemListRequest): Observable<EducationGradingSystemListResponse> {
    return this.httpClient.post<EducationGradingSystemListResponse>(`${environment.baseURL}${environment.educationGradingSystemList}`, educationGradingSystemListRequest)
  }
}
