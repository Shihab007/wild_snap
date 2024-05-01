import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentTranscriptReportService {

  constructor(private httpClient: HttpClient) { }

  getStudentTranscriptReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_STUDENT_TRANSCRIPT_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
