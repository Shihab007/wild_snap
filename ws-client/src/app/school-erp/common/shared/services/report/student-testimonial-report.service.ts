import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentTestimonialReportService {

  constructor(private httpClient: HttpClient) { }

  getStudentTestimonialReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_STUDENT_TESTIMONIAL_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}