import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddExamRequest } from '../../request/exam/add-exam-request';
import { ExamApproveByOidRequest } from '../../request/exam/exam-approve-by-oid-request';
import { ExamBookByOidRequest } from '../../request/exam/exam-book-by-oid-request';
import { ExamListBySectionRequest } from '../../request/exam/exam-list-by-section-request';
import { ExamListRequest } from '../../request/exam/exam-list-request';
import { ExamPublishByOidRequest } from '../../request/exam/exam-publish-by-oid-request';
import { ExamRejectByOidRequest } from '../../request/exam/exam-reject-by-oid-request';
import { GetExamByOidRequest } from '../../request/exam/get-exam-by-oid-request';
import { AddExamResponse } from '../../response/exam/add-exam-response';
import { ExamApproveByOidResponse } from '../../response/exam/exam-approve-by-oid-response';
import { ExamBookByOidResponse } from '../../response/exam/exam-book-by-oid-response';
import { ExamListResponse } from '../../response/exam/exam-list-response';
import { ExamPublishByOidResponse } from '../../response/exam/exam-publish-by-oid-response';
import { ExamRejectByOidResponse } from '../../response/exam/exam-reject-by-oid-response';
import { GetExamByOidResponse } from '../../response/exam/get-exam-by-oid-response';
import { GetExamTextbookByOidResponse } from '../../response/exam/get-exam-textbook-by-oid-response';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private httpClient: HttpClient) { }

  //exam
  getExamList(request: ExamListRequest): Observable<ExamListResponse> {
    return this.httpClient.post<ExamListResponse>(`${environment.baseURL}${environment.GET_EXAM_LIST}`, request)
  }

  getExamListBySection(request: ExamListBySectionRequest): Observable<ExamListResponse> {
    return this.httpClient.post<ExamListResponse>(`${environment.baseURL}${environment.EXAM_ROUTINE_LIST}`, request)
  }

  addExam(request: AddExamRequest): Observable<AddExamResponse> {
    return this.httpClient.post<AddExamResponse>(`${environment.baseURL}${environment.addExam}`, request)
  }

  getExamByOid(request: GetExamByOidRequest): Observable<GetExamByOidResponse> {
    return this.httpClient.post<GetExamByOidResponse>(`${environment.baseURL}${environment.getExamByOid}`, request)
  }

  getExamTextBookByOid(request: GetExamByOidRequest): Observable<GetExamTextbookByOidResponse> {
    return this.httpClient.post<GetExamTextbookByOidResponse>(`${environment.baseURL}${environment.EXAM_TEXT_BOOK_BY_OID}`, request)
  }

  getExamSubjectByOid(request: GetExamByOidRequest): Observable<GetExamTextbookByOidResponse> {
    return this.httpClient.post<GetExamTextbookByOidResponse>(`${environment.baseURL}${environment.EXAM_SUBJECT_BY_OID
      }`, request)
  }

  editExam(request: AddExamRequest): Observable<AddExamResponse> {
    return this.httpClient.post<AddExamResponse>(`${environment.baseURL}${environment.editExam}`, request)
  }

  approveExam(request: ExamApproveByOidRequest): Observable<ExamApproveByOidResponse> {
    return this.httpClient.post<ExamApproveByOidResponse>(`${environment.baseURL}${environment.APPROVE_EXAM}`, request)
  }

  rejectExam(request: ExamRejectByOidRequest): Observable<ExamRejectByOidResponse> {
    return this.httpClient.post<ExamRejectByOidResponse>(`${environment.baseURL}${environment.APPROVE_EXAM}`, request)
  }

  publishExam(request: ExamPublishByOidRequest): Observable<ExamPublishByOidResponse> {
    return this.httpClient.post<ExamPublishByOidResponse>(`${environment.baseURL}${environment.PUBLISH_EXAM}`, request)
  }

}
