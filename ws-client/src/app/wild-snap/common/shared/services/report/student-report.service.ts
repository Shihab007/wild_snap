import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolStudentReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_STUDENT_LIST_REPORT}`, request, {
      responseType: 'blob',
    })
  } getStudentId

  getSchoolStudenExcelSheet(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_STUDENT_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolTeacherReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_TEACHER_LIST_REPORT}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolGuardianReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_GUARDIAN_LIST_REPORT}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolPromotionStudentReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_PROMOTION_STUDENT_LIST_REPORT}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolPromotionStudentReportExcelSheet(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_STUDENT_PROMOTION_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolStudentClassDetailsReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_STUDENT_CLASS_DETAILS_REPORT}`, request, {
      responseType: 'blob',
    })
  }

}
