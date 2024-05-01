import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaveStudentPromotionRequest } from '../../request/student-promotion/save-student-promotion-request';
import { StudentPromotionViewRequest } from '../../request/student-promotion/student-promotion-view-request';
import { StudentResultRequest } from '../../request/student-promotion/student-result-request';
import { StudentRequestList } from '../../request/student/student-request-list';
import { GetStudentPromotionListResponse } from '../../response/student-promotion/get-student-promotion-list-response';
import { SaveStudentPromotionResponse } from '../../response/student-promotion/save-student-promotion-response';
import { StudentPromotionViewResponse } from '../../response/student-promotion/student-promotion-view-response';
import { StudentResultResponse } from '../../response/student-promotion/student-result-response';

@Injectable({
  providedIn: 'root'
})
export class StudentPromotionService {

  constructor(private httpClient: HttpClient) { }

  getStudentResultsList(request: StudentResultRequest): Observable<StudentResultResponse> {
    return this.httpClient.post<StudentResultResponse>(`${environment.baseURL}${environment.GET_STUDENT_PROMOTION_INFO}`, request)
  }

  saveStudentPromotionList(request: SaveStudentPromotionRequest): Observable<SaveStudentPromotionResponse> {
    return this.httpClient.post<SaveStudentPromotionResponse>(`${environment.baseURL}${environment.SAVE_STUDENT_PROMOTION}`, request)
  }

  getStudentList(request: StudentRequestList): Observable<StudentResultResponse> {
    return this.httpClient.post<StudentResultResponse>(`${environment.baseURL}${environment.allStudentList}`, request)
  }


  getStudentPromotionList(request: StudentRequestList): Observable<GetStudentPromotionListResponse> {
    return this.httpClient.post<GetStudentPromotionListResponse>(`${environment.baseURL}${environment.GET_STUDENT_PROMOTION_LIST}`, request)
  }


  getStudentPromotionView(request: StudentPromotionViewRequest): Observable<StudentPromotionViewResponse> {
    return this.httpClient.post<StudentPromotionViewResponse>(`${environment.baseURL}${environment.GET_STUDENT_PROMOTION_BY_OID
      }`, request)
  }


}
