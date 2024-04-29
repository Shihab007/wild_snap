import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassReportService {


  constructor(private httpClient: HttpClient) { }

  getSchoolClassRoutineReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_CLASS_ROUTINE_REPORT}`, request, {
      responseType: 'blob',
    })
  }


}
