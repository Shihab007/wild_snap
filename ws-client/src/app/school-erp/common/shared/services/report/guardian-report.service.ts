import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardianReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolGuardianExcelSheet(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_GUARDIAN_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }


}
