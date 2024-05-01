import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GradingSystemListRequest } from '../../request/grading/grading-system-list-request';
import { GradingSystemListResponse } from '../../response/grading/grading-system-list-response';

@Injectable({
  providedIn: 'root'
})
export class GradingSystemListService {

  constructor(private httpClient: HttpClient) { }

  // getGradingSystem(request: GradingSystemListRequest): Observable<GradingSystemListResponse> {
  //   return this.httpClient.post<GradingSystemListResponse>(`${environment.baseURL}${environment.educationGradingSystemList}`, request)
  // }

}
