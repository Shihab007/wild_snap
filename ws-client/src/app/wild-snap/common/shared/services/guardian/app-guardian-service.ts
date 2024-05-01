import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AddNewGuardianRequest } from "../../request/guardian/add-new-guardian-request";
import { GuardianEditRequest } from "../../request/guardian/guardian-edit-request";
import { GuardianListRequest } from "../../request/guardian/guardian-list-request";
import { GuardianProfileRequest } from "../../request/guardian/guardian-profile-request";
import { GuardianStudentListRequest } from "../../request/guardian/guardian-student-list-request";
import { InstituteGuardianListRequest } from "../../request/guardian/institute-guardian-list-request";
import { SchoolGuardianEditRequest } from "../../request/guardian/school-guardian-edit-request";
import { AddNewGuardianResponse } from "../../response/guardian/add-new-guardian-response";
import { GuardianEditResponse } from "../../response/guardian/guardian-edit-response";
import { GuardianListResponse } from "../../response/guardian/guardian-list-response";
import { GuardianProfileResponse } from "../../response/guardian/guardian-profile-response";
import { GuardianStudentListResponse } from "../../response/guardian/guardian-student-list-response";
import { InstituteGuardianListResponse } from "../../response/guardian/institute-guardian-list-response";

@Injectable({
  providedIn: 'root'
})
export class AppGuardianService {

  constructor(private httpClient: HttpClient) { }

  getGuardianProfileInfo(request: GuardianProfileRequest): Observable<GuardianProfileResponse> {
    return this.httpClient.post<GuardianProfileResponse>(`${environment.baseURL}${environment.GET_GUARDIAN_BY_OID}`, request)
  }

  updateGuardian(request: GuardianEditRequest): Observable<GuardianEditResponse> {
    return this.httpClient.post<GuardianEditResponse>(`${environment.baseURL}${environment.UPDATE_GUARDIAN}`, request)
  }

  updateSchoolGuardian(request: SchoolGuardianEditRequest): Observable<GuardianEditResponse> {
    return this.httpClient.post<GuardianEditResponse>(`${environment.baseURL}${environment.UPDATE_GUARDIAN}`, request)
  }

  saveGuardian(request: AddNewGuardianRequest): Observable<AddNewGuardianResponse> {
    return this.httpClient.post<AddNewGuardianResponse>(`${environment.baseURL}${environment.SAVE_GUARDIAN}`, request)
  }

  getGuardianList(request: GuardianListRequest): Observable<GuardianListResponse> {
    return this.httpClient.post<GuardianListResponse>(`${environment.baseURL}${environment.GET_GUARDIAN_LIST}`, request)
  }

  getInstituteGuardianList(request: InstituteGuardianListRequest): Observable<InstituteGuardianListResponse> {
    return this.httpClient.post<InstituteGuardianListResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_GUARDIAN_LIST}`, request)
  }

  getGuardianStudentList(request: GuardianStudentListRequest): Observable<GuardianStudentListResponse> {
    return this.httpClient.post<GuardianStudentListResponse>(`${environment.baseURL}${environment.guardianStudentList}`, request)
  }


}
