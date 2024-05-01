import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryListRequest } from '../../request/country/country-list-request';
import { CountyListResponse } from '../../response/country/county-list-response';

@Injectable({
  providedIn: 'root'
})
export class CuntryService {

  constructor(private httpClient: HttpClient) { }

  // Admin Service API

  getCountryList(request: CountryListRequest): Observable<CountyListResponse> {
    return this.httpClient.post<CountyListResponse>(`${environment.baseURL}${environment.GET_COUNTRY_LIST}`, request)
  }

}
