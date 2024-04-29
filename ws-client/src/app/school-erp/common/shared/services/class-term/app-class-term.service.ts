import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetInstituteClassTermListRequest } from '../../request/class-term/get-institute-class-term-list-request';
import { GetInstituteClassTermListResponse } from '../../response/class-term/get-institute-class-term-list-response';

@Injectable({
  providedIn: 'root'
})
export class AppClassTermService {

  constructor(private httpClient: HttpClient) { }

  getClassTermList(request: GetInstituteClassTermListRequest): Observable<GetInstituteClassTermListResponse> {
    return this.httpClient.post<GetInstituteClassTermListResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_CLASS_SETTING_TERM_LIST}`, request)
  }

}
