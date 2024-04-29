import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigureMessageScheduleByInstituteOidRequest } from '../../request/institute/configure-message-schedule-by-institute-oid-request';
import { GetInstituteByOidRequest } from '../../request/institute/get-institute-by-oid-request';
import { GetInstituteInfoRequest } from '../../request/institute/get-institute-info-request';
import { GetStaffComboListRequest } from '../../request/institute/get-staff-combo-list-request';
import { InstituteAddRequest } from '../../request/institute/institute-add-request';
import { InstituteListRequest } from '../../request/institute/institute-list-request';
import { ConfigureMessageScheduleByInstituteOidResponse } from '../../response/institute/configure-message-schedule-by-institute-oid-response';
import { GetInstituteByOidResponse } from '../../response/institute/get-institute-by-oid-response';
import { GetInstituteInfoResponse } from '../../response/institute/get-institute-info-response';
import { GetStaffComboListResponse } from '../../response/institute/get-staff-combo-list-response';
import { InstituteAddResponse } from '../../response/institute/institute-add-response';
import { InstituteListResponse } from '../../response/institute/institute-list-response';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  constructor(private httpClient: HttpClient) { }

  //Institute
  getInstituteInfo(request: GetInstituteInfoRequest): Observable<GetInstituteInfoResponse> {
    return this.httpClient.post<GetInstituteInfoResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_INFO}`, request)
  }

  getInstituteList(request: InstituteListRequest): Observable<InstituteListResponse> {
    return this.httpClient.post<InstituteListResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_LIST}`, request)
  }

  addInstitute(request: InstituteAddRequest): Observable<InstituteAddResponse> {
    return this.httpClient.post<InstituteAddResponse>(`${environment.baseURL}${environment.createInstitute}`, request)
  }

  editInstitute(request: InstituteAddRequest): Observable<InstituteAddResponse> {
    return this.httpClient.post<InstituteAddResponse>(`${environment.baseURL}${environment.editInstitute}`, request)
  }

  getInstituteByOid(request: GetInstituteByOidRequest): Observable<GetInstituteByOidResponse> {

    return this.httpClient.post<GetInstituteByOidResponse>(`${environment.baseURL}${environment.getInstituteByOid}`, request)
  }

  getStaffComboList(request: GetStaffComboListRequest): Observable<GetStaffComboListResponse> {
    return this.httpClient.post<GetStaffComboListResponse>(`${environment.baseURL}${environment.getStaffComboList}`, request)
  }

  configureMessageScheduleByInstituteOid(request: ConfigureMessageScheduleByInstituteOidRequest): Observable<ConfigureMessageScheduleByInstituteOidResponse> {
    return this.httpClient.post<ConfigureMessageScheduleByInstituteOidResponse>(`${environment.baseURL}${environment.CONFIGURE_MESSAGE_SCHEDULE_BY_INSTITUTE_OID}`, request)
  }

}
