import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeeDueByApplicationTrackingIdRequest } from '../../request/fee-due/fee-due-by-application-tracking-id-request';
import { UpdateFeeDueRequest } from '../../request/fee-due/update-fee-due-request';
import { FeeDueByApplicationTrackingIdResponse } from '../../response/fee-due/fee-due-by-application-tracking-id-response';
import { UpdateFeeDueResponse } from '../../response/fee-due/update-fee-due-response';

@Injectable({
  providedIn: 'root'
})
export class DueFeeService {

  constructor(private httpClient: HttpClient) { }

  getFeeDueByApplicationTrackingId(request: FeeDueByApplicationTrackingIdRequest): Observable<FeeDueByApplicationTrackingIdResponse> {
    return this.httpClient.post<FeeDueByApplicationTrackingIdResponse>(`${environment.baseURL}${environment.GET_FEE_DUE_BY_APPLICATION_TRACKING_ID}`, request)
  }

  updateFeeDue(request: UpdateFeeDueRequest): Observable<UpdateFeeDueResponse> {
    return this.httpClient.post<UpdateFeeDueResponse>(`${environment.baseURL}${environment.UPDATE_FEE_DUE}`, request)
  }
}
