import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportService {


  constructor(private httpClient: HttpClient) { }

  getStudentAttendanceReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_STUDENT_ATTENDANCE__REPORT}`, request, {
      responseType: 'blob',
    })
  }

  getTeacherAttendanceReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_TEACHER_ATTENDANCE_REPORT_BY_DATE}`, request, {
      responseType: 'blob',
    })
  }

}
