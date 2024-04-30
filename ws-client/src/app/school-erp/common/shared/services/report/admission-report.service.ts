import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolAdmissionApllicationReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ADMISSION_LIST_REPORT
      }`, request, {
      responseType: 'blob',
    })
  }

}