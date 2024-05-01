import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationSessionListRequest } from '../../request/education/education-session-list-request';
import { EducationSessionListResponse } from '../../response/education/education-session-list-response';

@Injectable({
  providedIn: 'root'
})
export class EducationSessionListService {

  constructor(private httpClient: HttpClient) { }

  educationSessionList(educationSessionListRequest:EducationSessionListRequest):Observable<EducationSessionListResponse>{
    return this.httpClient.post<EducationSessionListResponse>(`${environment.baseURL}${environment.instituteSessionList}`, educationSessionListRequest)
  }
}
