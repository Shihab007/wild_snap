import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextbookReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolBankAccountListReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_TEXT_BOOK_LIST_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
