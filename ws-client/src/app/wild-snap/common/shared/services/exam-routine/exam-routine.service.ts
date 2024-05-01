import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamRoutineByOidRequest } from '../../request/exam-routine/exam-routine-by-oid-request';
import { ExamRoutineListReqest } from '../../request/exam-routine/exam-routine-list-reqest';
import { ExamRoutineRequest } from '../../request/exam-routine/exam-routine-request';
import { ExamRoutineDetailsByOidRequest } from '../../request/exam/exam-routine-details-by-oid-request';
import { ExamRoutineByOidResponse } from '../../response/exam-routine/exam-routine-by-oid-response';
import { ExamRoutineListResponse } from '../../response/exam-routine/exam-routine-list-response';
import { ExamRoutineResponse } from '../../response/exam-routine/exam-routine-response';
import { ExamRoutineDetailsByOidResponse } from '../../response/exam/exam-routine-details-by-oid-response';

@Injectable({
  providedIn: 'root'
})
export class ExamRoutineService {

  constructor(private httpClient: HttpClient) { }

  //exam
  // saveExamRoutine(request: ExamRoutineRequest): Observable<ExamRoutineResponse> {
  //   return this.httpClient.post<ExamRoutineResponse>(`${environment.baseURL}${environment.SAVE_EXAM_ROUTINE}`, request)
  // }

  saveExamRoutine(request: ExamRoutineRequest): Observable<ExamRoutineResponse> {
    return this.httpClient.post<ExamRoutineResponse>(`${environment.baseURL}${environment.SAVE_EXAM_ROUTINE}`, request)
  }

  updateExamRoutine(request: ExamRoutineRequest): Observable<ExamRoutineResponse> {
    return this.httpClient.post<ExamRoutineResponse>(`${environment.baseURL}${environment.UPDATE_EXAM_ROUTINE}`, request)
  }

  getExamRoutineList(request: ExamRoutineListReqest): Observable<ExamRoutineListResponse> {
    return this.httpClient.post<ExamRoutineListResponse>(`${environment.baseURL}${environment.EXAM_ROUTINE_LIST}`, request)
  }

  getGuardianExamRoutineList(request: ExamRoutineListReqest): Observable<ExamRoutineListResponse> {
    return this.httpClient.post<ExamRoutineListResponse>(`${environment.baseURL}${environment.Guardian_EXAM_ROUTINE_LIST}`, request)
  }

  getExamRoutineDetailsByOid(request: ExamRoutineDetailsByOidRequest): Observable<ExamRoutineDetailsByOidResponse> {
    return this.httpClient.post<ExamRoutineDetailsByOidResponse>(`${environment.baseURL}${environment.GET_EXAM_ROUTINE_BY_OID}`, request)
  }

  getExamRoutineByOid(request: ExamRoutineByOidRequest): Observable<ExamRoutineByOidResponse> {
    return this.httpClient.post<ExamRoutineByOidResponse>(`${environment.baseURL}${environment.GET_EXAM_ROUTINE_BY_OID}`, request)
  }

}
