import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolContactListReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_CONTACT_LIST_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
