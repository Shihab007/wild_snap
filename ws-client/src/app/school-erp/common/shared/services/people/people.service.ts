import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetPeopleByOidRequest } from '../../request/asset/people/get-people-by-oid-request';
import { GetPeopleListRequest } from '../../request/asset/people/get-people-list-request';
import { SavePeopleRequest } from '../../request/asset/people/save-people-request';
import { UpdatePeopleRequest } from '../../request/asset/people/update-people-request';
import { GetPeopleByOidResponse } from '../../response/asset/people/get-people-by-oid-response';
import { GetPeopleListResponse } from '../../response/asset/people/get-people-list-response';
import { SavePeopleResponse } from '../../response/asset/people/save-people-response';
import { UpdatePeopleResponse } from '../../response/asset/people/update-people-response';
import { ApprovePeopleRequest } from '../../request/asset/people/approve-people-request';
import { RejectPeopleRequest } from '../../request/asset/people/reject-people-request';
import { ApprovePeopleResponse } from '../../response/asset/people/approve-people-response';
import { RejectPeopleResponse } from '../../response/asset/people/reject-people-response';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  getPeopleList(getPeopleListRequest: GetPeopleListRequest): Observable<GetPeopleListResponse> {
    return this.httpClient.post<GetPeopleListResponse>(
      `${environment.baseURL}${environment.GET_PEOPLE_LIST}`, getPeopleListRequest);
  }

  getPeopleByOid(getPeopleByOidRequest: GetPeopleByOidRequest): Observable<GetPeopleByOidResponse> {
    return this.httpClient.post<GetPeopleByOidResponse>(
      `${environment.baseURL}${environment.GET_PEOPLE_BY_OID}`, getPeopleByOidRequest);
  }

  savePeople(savePeopleRequest: SavePeopleRequest): Observable<SavePeopleResponse> {
    return this.httpClient.post<SavePeopleResponse>(
      `${environment.baseURL}${environment.SAVE_PEOPLE}`, savePeopleRequest);
  }

  updatePeople(updatePeopleRequest: UpdatePeopleRequest): Observable<UpdatePeopleResponse> {
    return this.httpClient.post<UpdatePeopleResponse>(
      `${environment.baseURL}${environment.UPDATE_PEOPLE}`, updatePeopleRequest);
  }

  approve(updatePeopleRequest: ApprovePeopleRequest): Observable<ApprovePeopleResponse> {
    return this.httpClient.post<ApprovePeopleResponse>(
      `${environment.baseURL}${environment.APPROVE_PEOPLE}`, updatePeopleRequest);
  }

  reject(updatePeopleRequest: RejectPeopleRequest): Observable<RejectPeopleResponse> {
    return this.httpClient.post<RejectPeopleResponse>(
      `${environment.baseURL}${environment.REJECT_PEOPLE}`, updatePeopleRequest);
  }
}
