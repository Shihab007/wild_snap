import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolPeopleReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_PEOPLE_LIST_REPORT
      }`, request, {
      responseType: 'blob',
    })
  }

  downloadPeopleExcelSheet(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_PEOPLE_LIST_EXCEL_SHEET
      }`, request, {
      responseType: 'blob',
    })
  }

}
