import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DivisionListRequest } from '../../request/division/division-list-request';
import { DivisionListResponse } from '../../response/division/division-list-response';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private httpClient: HttpClient) { }

  getDivisionList(request: DivisionListRequest): Observable<DivisionListResponse> {
    return this.httpClient.post<DivisionListResponse>(
      `${environment.baseURL}${environment.GET_DIVISION_LIST}`, request);
  }

}
