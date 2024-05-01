import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationVersionListRequest } from '../../request/education/education-version-list-request';
import { EducationVersionListResponse } from '../../response/education/education-version-list-response';

@Injectable({
  providedIn: 'root'
})
export class EducationVersionListService {

  constructor(private httpClient: HttpClient) { }

  educationVersionList(educationVersionListRequest:EducationVersionListRequest):Observable<EducationVersionListResponse>{
    return this.httpClient.post<EducationVersionListResponse>(`${environment.baseURL}${environment.instituteVersionList}`, educationVersionListRequest)
  }
}
