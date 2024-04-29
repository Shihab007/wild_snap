import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolTeacherReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_TEACHER_LIST_REPORT}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolTeacherExcelSheet(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_TEACHER_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }
}
