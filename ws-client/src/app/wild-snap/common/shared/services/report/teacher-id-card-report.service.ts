import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeacherIdCardReportService {

  constructor(private httpClient: HttpClient) { }

  getTeacherIdCardReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_TEACHER_ID_CARD_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
