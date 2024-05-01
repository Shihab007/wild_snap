import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetEducationGroupListBySessionRequest } from '../../request/education/get-education-group-list-by-session-request';
import { GetEducationGroupListBySessionResponse } from '../../response/education/get-education-group-list-by-session-response';

@Injectable({
  providedIn: 'root'
})
export class EducationGroupService {
  constructor(private httpClient: HttpClient) { }

  getEducationGroupListBySession(request: GetEducationGroupListBySessionRequest): Observable<GetEducationGroupListBySessionResponse> {
    return this.httpClient.post<GetEducationGroupListBySessionResponse>(`${environment.baseURL}${environment.EDUCATION_GROUP_LIST_BY_SESSION}`, request)
  }
}
