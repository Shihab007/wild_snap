import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThanaListRequest } from '../../request/thana/thana-list-request';
import { ThanaListResponse } from '../../response/thana/thana-list-response';

@Injectable({
  providedIn: 'root'
})
export class ThanaService {

  constructor(private httpClient: HttpClient) { }

  getThanaList(request: ThanaListRequest): Observable<ThanaListResponse> {
    return this.httpClient.post<ThanaListResponse>(
      `${environment.baseURL}${environment.GET_THANA_LIST}`, request);
  }

}
