import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DistrictListRequest } from '../../request/district/district-list-request';
import { DistrictListResponse } from '../../response/district/district-list-response';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  constructor(private httpClient: HttpClient) { }

  getDistrictList(request: DistrictListRequest): Observable<DistrictListResponse> {
    return this.httpClient.post<DistrictListResponse>(
      `${environment.baseURL}${environment.GET_DISTRICT_LIST}`, request);
  }
}
