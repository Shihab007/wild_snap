import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckClassRoutineBySectionRequest } from '../../request/class-routine/check-class-routine-by-section-request';
import { ClassRoutineDetailsByOidRequest } from '../../request/class-routine/class-routine-details-by-oid-request';
import { ClassRoutineDetailsByTeacherOidRequest } from '../../request/class-routine/class-routine-details-by-teacher-oid-request';
import { ClassRoutineListRequest } from '../../request/class-routine/class-routine-list-request';
import { ClassRoutineRequest } from '../../request/class-routine/class-routine-request';
import { ExistingClassRoutineDetailsByOidRequest } from '../../request/class-routine/existing-class-routine-details-by-oid-request';
import { CheckClassRoutineBySectionResponse } from '../../response/class-routine/check-class-routine-by-section-response';
import { ClassRoutineDetailsByOidResponse } from '../../response/class-routine/class-routine-details-by-oid-response';
import { ClassRoutineDetailsByTeacherOidResponse } from '../../response/class-routine/class-routine-details-by-teacher-oid-response';
import { ClassRoutineListResponse } from '../../response/class-routine/class-routine-list-response';
import { ClassRoutineResponse } from '../../response/class-routine/class-routine-response';
import { ExistingClassRoutineDetailsByOidResponse } from '../../response/class-routine/existing-class-routine-details-by-oid-response';
import { ApproveRejectClassRoutineRequest } from '../../request/class-routine/approve-reject-class-routine-request';
import { ApproveRejectClassRoutineResponse } from '../../response/class-routine/approve-reject-class-routine-response';

@Injectable({
  providedIn: 'root'
})
export class ClassRoutineService {

  constructor(private httpClient: HttpClient) { }

  getClassRoutineList(request: ClassRoutineListRequest): Observable<ClassRoutineListResponse> {
    return this.httpClient.post<ClassRoutineListResponse>(`${environment.baseURL}${environment.GET_CLASS_ROUTINE_LIST}`, request)
  }

  getClassRoutineDetailsByOid(request: ClassRoutineDetailsByOidRequest): Observable<ClassRoutineDetailsByOidResponse> {
    return this.httpClient.post<ClassRoutineDetailsByOidResponse>(`${environment.baseURL}${environment.GET_CLASS_ROUTINE_DETAILS_BY_OID}`, request)
  }

  getClassRoutineDetailsByTeacherOid(request: ClassRoutineDetailsByTeacherOidRequest): Observable<ClassRoutineDetailsByTeacherOidResponse> {
    return this.httpClient.post<ClassRoutineDetailsByTeacherOidResponse>(`${environment.baseURL}${environment.GET_CLASS_ROUTINE_DETAILS_BY_TEACHER_OID}`, request)
  }
  getExistingClassRoutineDetailsByOid(request: ExistingClassRoutineDetailsByOidRequest): Observable<ExistingClassRoutineDetailsByOidResponse> {
    return this.httpClient.post<ExistingClassRoutineDetailsByOidResponse>(`${environment.baseURL}${environment.GET_EXISTING_CLASS_ROUTINE_DETAILS_BY_OID}`, request)
  }

  saveClassRoutine(request: ClassRoutineRequest): Observable<ClassRoutineResponse> {
    return this.httpClient.post<ClassRoutineResponse>(`${environment.baseURL}${environment.CLASS_ROUTINE_DETAILS_SAVE}`, request)
  }

  updateClassRoutine(request: ClassRoutineRequest): Observable<ClassRoutineResponse> {
    return this.httpClient.post<ClassRoutineResponse>(`${environment.baseURL}${environment.CLASS_ROUTINE_DETAILS_UPDATE}`, request)
  }

  checkClassRoutineBySectionOid(request: CheckClassRoutineBySectionRequest): Observable<CheckClassRoutineBySectionResponse> {
    return this.httpClient.post<CheckClassRoutineBySectionResponse>(`${environment.baseURL}${environment.CHECK_CLASS_ROUTINE_BY_SECTION_OID}`, request)
  }

  approveReject(request: ApproveRejectClassRoutineRequest): Observable<ApproveRejectClassRoutineResponse> {
    return this.httpClient.post<ApproveRejectClassRoutineResponse>(`${environment.baseURL}${environment.APPROVE_REJECT_CLASS_ROUTINE}`, request)
  }

}
