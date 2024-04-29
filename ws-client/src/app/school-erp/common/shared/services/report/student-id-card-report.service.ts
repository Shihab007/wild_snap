import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentIdCardReportService {

  constructor(private httpClient: HttpClient) { }

  getStudentIdCardReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_STUDENT_ID_CARD_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
