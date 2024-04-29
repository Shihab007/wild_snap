import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ExamResultByStudent } from '../../model/exam-result/exam-result-by-student';
import { ExamMarkSheetReportRequest } from '../../request/exam-result/exam-mark-sheet-report-request';
import { ExamResultByStudentRequest } from '../../request/exam-result/exam-result-by-student-request';
import { ExamResultDetailListRequest } from '../../request/exam-result/exam-result-detail-list-request';
import { ExamResultListByStudentRequest } from '../../request/exam-result/exam-result-list-by-student-request';
import { ExamResultListRequest } from '../../request/exam-result/exam-result-list-request';
import { ExamResultPublishRequest } from '../../request/exam-result/exam-result-publish-request';
import { ExamResultDetailByOidRequest } from '../../request/exam-result/get-exam-result-detail-request';
import { StudentListByExamTextbookRequest } from '../../request/exam-result/get-student-list-by-examtextbook-request';
import { SaveExamResultRequest } from '../../request/exam-result/save-exam-result-request';
import { StudentListByExamSubjectRequest } from '../../request/exam-result/student-list-by-exam-subject-request';
import { ExamMarkSheetReportResponse } from '../../response/exam-result/exam-mark-sheet-report-response';
import { ExamResultByStudentResponse } from '../../response/exam-result/exam-result-by-student-response';
import { ExamResultDetailListResponse } from '../../response/exam-result/exam-result-detail-list-response';
import { ExamResultListByStudentResponse } from '../../response/exam-result/exam-result-list-by-student-response';
import { ExamResultListResponse } from '../../response/exam-result/exam-result-list-response';
import { ExamResultPublishResponse } from '../../response/exam-result/exam-result-publish-response';
import { ExamResultDetailByOidResponse } from '../../response/exam-result/get-exam-result-detail-response';
import { StudentListByExamTextbookResponse } from '../../response/exam-result/get-student-list-by-examtextbook-response';
import { SaveExamResultResponse } from '../../response/exam-result/save-exam-result-response';
import { StudentListByExamSubjectResponse } from '../../response/exam-result/student-list-by-exam-subject-response';
import { StudentListByExamSubjectTermRequest } from '../../request/exam-result/student-list-by-exam-subject-term-request';
import { StudentListByExamSubjectTermResponse } from '../../response/exam-result/student-list-by-exam-subject-term-response';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {

  constructor(private httpClient: HttpClient) { }

  saveExamResult(request: SaveExamResultRequest): Observable<SaveExamResultResponse> {
    return this.httpClient.post<SaveExamResultResponse>(`${environment.baseURL}${environment.SAVE_EXAM_RESULT}`, request)
  }

  getExamResultList(request: ExamResultListRequest): Observable<ExamResultListResponse> {
    return this.httpClient.post<ExamResultListResponse>(`${environment.baseURL}${environment.GET_EXAM_RESULT_LIST}`, request)
  }

  getExamResultDetailList(request: ExamResultDetailListRequest): Observable<ExamResultDetailListResponse> {
    return this.httpClient.post<ExamResultDetailListResponse>(`${environment.baseURL}${environment.GET_EXAM_RESULT_DETAIL_LIST}`, request)
  }

  getStudentListByExamTextBook(request: StudentListByExamTextbookRequest): Observable<StudentListByExamTextbookResponse> {
    return this.httpClient.post<StudentListByExamTextbookResponse>(`${environment.baseURL}${environment.GET_STUDENT_LIST_BY_EXAMTEXTBOOK}`, request)
  }

  getStudentListByExamSubject(request: StudentListByExamSubjectRequest): Observable<StudentListByExamSubjectResponse> {
    return this.httpClient.post<StudentListByExamSubjectResponse>(`${environment.baseURL}${environment.GET_STUDENT_LIST_BY_EXAMSUBJECT}`, request)
  }

  //subject result by term
  //start
  getStudentListByExamSubjectTerm(request: StudentListByExamSubjectTermRequest): Observable<StudentListByExamSubjectTermResponse> {
    return this.httpClient.post<StudentListByExamSubjectTermResponse>(`${environment.baseURL}${environment.GET_STUDENT_LIST_BY_EXAMSUBJECT_TERM}`, request)
  }
  //end




  getExamResultListByStudent(request: ExamResultListByStudentRequest): Observable<ExamResultListByStudentResponse> {
    return this.httpClient.post<ExamResultListByStudentResponse>(`${environment.baseURL}${environment.GET_EXAM_RESULT_LIST_BY_STUDENT}`, request)
  }

  examResultPublish(request: ExamResultPublishRequest): Observable<ExamResultPublishResponse> {
    return this.httpClient.post<ExamResultPublishResponse>(`${environment.baseURL}${environment.PUBLISH_EXAM_RESULT}`, request)
  }

  getExamResultByStudent(request: ExamResultByStudentRequest): Observable<ExamResultByStudentResponse> {
    return this.httpClient.post<ExamResultByStudentResponse>(`${environment.baseURL}${environment.EXAM_RESULT_BY_STUDENT_ID}`, request)
  }

  getExamResultListBySection(request: ExamResultDetailByOidRequest): Observable<ExamResultDetailByOidResponse> {
    return this.httpClient.post<ExamResultDetailByOidResponse>(`${environment.baseURL}${environment.GET_EXAM_RESULT_BY_SECTION_OID}`, request)
  }

}
