import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssignmentByOidRequest } from '../../request/assignment/assignment-by-oid-request';
import { AssignmentListRequest } from '../../request/assignment/get-assignment-list-request';
import { SaveAssignmentRequest } from '../../request/assignment/save-assignment-request';
import { SubjectRequest } from '../../request/assignment/subject-request';
import { UpdateAssignmentRequest } from '../../request/assignment/update-assignment-request';
import { AssignmentListResponse } from '../../response/assignment/assignment-list-response';
import { GetAssignmentByOidResponse } from '../../response/assignment/get-assignment-by-oid-response';
import { SaveAssignmentResponse } from '../../response/assignment/save-assignment-response';
import { SubjectResponse } from '../../response/assignment/subject-response';
import { UpdateAssignmentResponse } from '../../response/assignment/update-assignment-response';
import { AssignmentMarkAddRequest } from '../../request/assignment/assignment-mark-add-request';
import { AssignmentMarkAddResponse } from '../../response/assignment/assignment-mark-add-response';
import { AssignmentMarkEditRequest } from '../../request/assignment/assignment-mark-edit-request';
import { AssignmentEditResponse } from '../../response/assignment/assignment-mark-edit-response';
import { AssignmentListByGuardianRequest } from '../../request/assignment/assignment-list-by-guardian-request';
import { AssignmentListByGuardianResponse } from '../../response/assignment/assignment-list-by-guardian-response';
import { AssignmentForGuardianRequest } from '../../request/assignment/assignment-for-guardian-request';
import { AssignmentForGuardianResponse } from '../../response/assignment/assignment-for-guardian-response';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private httpClient: HttpClient) { }

  getAssignmentList(request: AssignmentListRequest): Observable<AssignmentListResponse> {
    return this.httpClient.post<AssignmentListResponse>(`${environment.baseURL}${environment.GET_ASSIGNMENT_LIST}`, request)
  }

  getAssignmentListByGuardian(request: AssignmentListByGuardianRequest): Observable<AssignmentListByGuardianResponse> {
    return this.httpClient.post<AssignmentListByGuardianResponse>(`${environment.baseURL}${environment.GET_ASSIGNMENT_LIST_BY_GUARDIAN}`, request)
  }

  getAssignmentByOid(request: AssignmentByOidRequest): Observable<GetAssignmentByOidResponse> {
    return this.httpClient.post<GetAssignmentByOidResponse>(`${environment.baseURL}${environment.GET_ASSIGNMENT_DETAILS_BY_OID}`, request)
  }

  getAssignmentForGuardian(request: AssignmentForGuardianRequest): Observable<AssignmentForGuardianResponse> {
    return this.httpClient.post<AssignmentForGuardianResponse>(`${environment.baseURL}${environment.GET_ASSIGNMENT_DETAILS_BY_GUARDIAN}`, request)
  }

  saveAssignment(request: SaveAssignmentRequest): Observable<SaveAssignmentResponse> {
    return this.httpClient.post<SaveAssignmentResponse>(`${environment.baseURL}${environment.SAVE_ASSIGNMENT}`, request)
  }

  updateAssignment(request: UpdateAssignmentRequest): Observable<UpdateAssignmentResponse> {
    return this.httpClient.post<UpdateAssignmentResponse>(`${environment.baseURL}${environment.UPDATE_ASSIGNMENT}`, request)
  }

  getSubjectByOid(request: SubjectRequest): Observable<SubjectResponse> {
    return this.httpClient.post<SubjectResponse>(`${environment.baseURL}${environment.GET_SUBJECT_LIST}`, request)
  }

  addAssignmentMark(request: AssignmentMarkAddRequest): Observable<AssignmentMarkAddResponse> {
    return this.httpClient.post<AssignmentMarkAddResponse>(`${environment.baseURL}${environment.SAVE_ASSIGNMENT_MARK}`, request)
  }

  editAssignmentMark(request: AssignmentMarkEditRequest): Observable<AssignmentEditResponse> {
    return this.httpClient.post<AssignmentEditResponse>(`${environment.baseURL}${environment.UPDATE_ASSIGNMENT_MARK}`, request)
  }

}
