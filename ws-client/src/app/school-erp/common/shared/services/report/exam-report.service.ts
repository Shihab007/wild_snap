import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolExamResultReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_EXAM_RESULT_REPORT}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolExamRoutineReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_EXAM_ROUTINE_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
