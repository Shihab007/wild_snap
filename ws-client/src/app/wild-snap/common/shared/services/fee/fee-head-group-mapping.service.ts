import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeeHeadGroupMappingAddRequest } from '../../request/fee/fee-head-group-mapping-add-request';
import { FeeHeadGroupMappingByInstituteAndGroupRequest } from '../../request/fee/fee-head-group-mapping-by-institute-and-group-request';
import { FeeHeadGroupMappingAddResponse } from '../../response/fee/fee-head-group-mapping-add-response';
import { FeeHeadGroupMappingByInstituteAndGroupResponse } from '../../response/fee/fee-head-group-mapping-by-institute-and-group-response';
import { FeeHeadGroupMappingListResponse } from '../../response/fee/fee-head-group-mapping-list-response';
@Injectable({
  providedIn: 'root'
})
export class FeeHeadGroupMappingService {

  constructor(private httpClient: HttpClient) { }

  addFeeHeadGroupMapping(request: FeeHeadGroupMappingAddRequest): Observable<FeeHeadGroupMappingAddResponse> {
    return this.httpClient.post<FeeHeadGroupMappingAddResponse>(`${environment.baseURL}${environment.CREATE_FEE_HEAD_GROUP_MAPPING}`, request)
  }

  getFeeHeadGroupMappingListByInstitute(request): Observable<FeeHeadGroupMappingListResponse> {
    return this.httpClient.post<FeeHeadGroupMappingListResponse>(`${environment.baseURL}${environment.GET_FEE_HEAD_GROUP_MAPPING_LIST_BY_INSTITUTE}`, request)
  }

  viewDetailFeeHeadGroupMapping(request: FeeHeadGroupMappingByInstituteAndGroupRequest): Observable<FeeHeadGroupMappingByInstituteAndGroupResponse> {
    return this.httpClient.post<FeeHeadGroupMappingByInstituteAndGroupResponse>(`${environment.baseURL}${environment.GET_FEE_HEAD_GROUP_MAPPING_BY_INSTITUTE_AND_GROUP_CODE}`, request)
  }
}
