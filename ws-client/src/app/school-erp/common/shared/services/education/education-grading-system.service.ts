import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationGradingSystemListRequest } from '../../request/education/education-grading-system-list-request';
import { EducationGradingSystemListResponse } from '../../response/education/education-grading-system-list-response';

@Injectable({
  providedIn: 'root'
})
export class EducationGradingSystemService {

  constructor(private httpClient: HttpClient) { }

  // educationGradingSystemList(educationGradingSystemListRequest:EducationGradingSystemListRequest):Observable<EducationGradingSystemListResponse>{
  //   return this.httpClient.post<EducationGradingSystemListResponse>(`${environment.baseURL}${environment.educationGradingSystemList}`, educationGradingSystemListRequest)
  // }





}
