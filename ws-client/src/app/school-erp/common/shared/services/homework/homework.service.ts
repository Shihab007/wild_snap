import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeworkListByGuardianIdRequest } from '../../request/homework/homework-list-by-guardian-id-request';
import { HomeworkListByStudentIdRequest } from '../../request/homework/homework-list-by-student-id-request';
import { HomeworkRequest } from '../../request/homework/homework-request';
import { HomeworkSubmissionRequest } from '../../request/homework/homework-submission-request';
import { SubjectRequest } from '../../request/homework/subject-request';
import { GetHomeworkByOidResponse } from '../../response/homework/get-homework-by-oid-response';
import { HomeWorkListResponse } from '../../response/homework/home-work-list-response';
import { HomeworkListByGuardianIdResponse } from '../../response/homework/homework-list-by-guardian-id-response';
import { HomeworkListByStudentIdResponse } from '../../response/homework/homework-list-by-student-id-response';
import { HomeworkResponse } from '../../response/homework/homework-response';
import { HomeworkSubmissionResponse } from '../../response/homework/homework-submission-response';
import { SubjectResponse } from '../../response/homework/subject-response';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  constructor(private httpClient: HttpClient) { }

  saveHomework(request: HomeworkRequest): Observable<HomeworkResponse> {
    return this.httpClient.post<HomeworkResponse>(`${environment.baseURL}${environment.CREATE_HOMEWORK}`, request)
  }
  getSubjectByOid(request: SubjectRequest): Observable<SubjectResponse> {
    return this.httpClient.post<SubjectResponse>(`${environment.baseURL}${environment.GET_SUBJECT_LIST}`, request)
  }

  getHomeWorkList(request: HomeworkRequest): Observable<HomeWorkListResponse> {
    return this.httpClient.post<HomeWorkListResponse>(`${environment.baseURL}${environment.GET_HOME_WORK_LIST}`, request)
  }

  getHomeWorkByOid(request: HomeworkRequest): Observable<GetHomeworkByOidResponse> {
    return this.httpClient.post<GetHomeworkByOidResponse>(`${environment.baseURL}${environment.GET_HOME_WORK_BY_OID}`, request)
  }

  saveHomeworkSubmission(request: HomeworkSubmissionRequest): Observable<HomeworkSubmissionResponse> {
    return this.httpClient.post<HomeworkSubmissionResponse>(`${environment.baseURL}${environment.CREATE_HOMEWORK_SUBMISSION}`, request)
  }

  getHomeWorkListByGuardianId(request: HomeworkListByGuardianIdRequest): Observable<HomeworkListByGuardianIdResponse> {
    return this.httpClient.post<HomeworkListByGuardianIdResponse>(`${environment.baseURL}${environment.GET_HOME_WORK_LIST_BY_GUARDIAN_ID}`, request)
  }
  getHomeWorkListByStudentId(request: HomeworkListByStudentIdRequest): Observable<HomeworkListByStudentIdResponse> {
    return this.httpClient.post<HomeworkListByStudentIdResponse>(`${environment.baseURL}${environment.GET_HOME_WORK_LIST_BY_STUDENT_ID}`, request)
  }
}
