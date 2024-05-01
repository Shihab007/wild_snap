import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolAssetListReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ASSET_LIST_REPORT}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolAssetDetailsReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ASSET_DETAILS_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
