import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerateUploadByExcelSheetService {

  constructor(private httpClient: HttpClient) { }

  addSchoolStudenExcelSheet(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.CREATE_STUDENT_BY_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }





}
