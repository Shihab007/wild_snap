import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetEducationClassListBySessionRequest } from '../../request/education/get-education-class-list-by-session-request';
import { GetEducationClassListBySessionResponse } from '../../response/education/get-education-class-list-by-session-response';

@Injectable({
  providedIn: 'root'
})
export class EducationClassService {
  constructor(private httpClient: HttpClient) { }

  getEducationClassListBySession(request: GetEducationClassListBySessionRequest): Observable<GetEducationClassListBySessionResponse> {
    return this.httpClient.post<GetEducationClassListBySessionResponse>(`${environment.baseURL}${environment.GET_EDUCATION_CLASS_LIST_BY_SESSION}`, request)
  }
}
