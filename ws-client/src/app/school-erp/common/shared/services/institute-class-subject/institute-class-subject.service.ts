import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateInsituteClassSubjectRequest } from '../../request/institute-class-subject/create-insitute-class-subject-request';
import { GetSubjectListByInstituteTypeRequest } from '../../request/institute-class-subject/get-subject-list-by-institute-type-request';
import { InstituteClassSubjectRequest } from '../../request/institute-class-subject/institute-class-subject-request';
import { UpdateInstituteClassSubjectRequest } from '../../request/institute-class-subject/update-institute-class-subject-request';
import { GetInstituteByOidRequest } from '../../request/institute/get-institute-by-oid-request';
import { GetSubjectListByStudentIdRequest } from '../../request/student/get-subject-list-by-student-id-request';
import { UpdateStudentSubjectRequest } from '../../request/student/update-student-subject-request';
import { CommonSaveOrUpdateResponse } from '../../response/common/common-save-or-update-response';
import { GetSubjectListByInstituteTypeResponse } from '../../response/institute-class-subject/get-subject-list-by-institute-type-response';
import { InstituteClassSubjectResponse } from '../../response/institute-class-subject/institute-class-subject-response';
import { UpdateInstituteClassSubjectResponse } from '../../response/institute-class-subject/update-institute-class-subject-response';
import { UpdateInstituteClassSubjectResponseBody } from '../../response/institute-class-subject/update-institute-class-subject-response-body';
import { GetInstituteByOidResponse } from '../../response/institute/get-institute-by-oid-response';
import { GetSubjectListByStudentIdResponse } from '../../response/student/get-subject-list-by-student-id-response';

@Injectable({
  providedIn: 'root'
})
export class InstituteClassSubjectService {

  constructor(private httpClient: HttpClient) { }

  getInstituteClassSubjectListByClassOid(request: InstituteClassSubjectRequest): Observable<InstituteClassSubjectResponse> {
    return this.httpClient.post<InstituteClassSubjectResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_CLASS_SUBJECT_LIST_BY_CLASS_OID
      }`, request)
  }

  getInstituteClassSubjectList(request: InstituteClassSubjectRequest): Observable<InstituteClassSubjectResponse> {
    return this.httpClient.post<InstituteClassSubjectResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_CLASS_SUBJECT_LIST
      }`, request)
  }

  saveInstituteClassSubject(request: CreateInsituteClassSubjectRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.SAVE_INSTITUTE_CLASS_SUBJECT
      }`, request)
  }

  updateInstituteClassSubject(request: CreateInsituteClassSubjectRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.UPDATE_INSTITUTE_CLASS_SUBJECT
      }`, request)
  }

  getInstituteClassSubjectByClassOid(request: GetInstituteByOidRequest): Observable<GetInstituteByOidResponse> {
    return this.httpClient.post<GetInstituteByOidResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_CLASS_SUBJECT_BY_CLASS_OID
      }`, request)
  }

  getSubjectListByInstituteType(request: GetSubjectListByInstituteTypeRequest): Observable<GetSubjectListByInstituteTypeResponse> {
    return this.httpClient.post<GetSubjectListByInstituteTypeResponse>(`${environment.baseURL}${environment.GET_SUBJECT_LIST_BY_INSTITUTE_TYPE
      }`, request)
  }

  getSubjectListByStudentId(request: GetSubjectListByStudentIdRequest): Observable<GetSubjectListByStudentIdResponse> {
    return this.httpClient.post<GetSubjectListByStudentIdResponse>(`${environment.baseURL}${environment.GET_SUBJECT_LIST_BY_STUDENT_ID}`, request)
  }

  updateStudentSubject(request: UpdateStudentSubjectRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(`${environment.baseURL}${environment.UPDATE_STUDENT_SUBJECT}`, request)
  }

  updateInstituteClassSubjectListByClassOid(request: UpdateInstituteClassSubjectRequest): Observable<UpdateInstituteClassSubjectResponse> {
    return this.httpClient.post<UpdateInstituteClassSubjectResponse>(`${environment.baseURL}${environment.UPDATE_INSTITUTE_CLASS_SUBJECT}`, request)
  }

}
