import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassGroupListByClassSessionRequest } from '../../request/class-group/class-group-list-by-class-session-request';
import { ClassGroupListRequest } from '../../request/class-group/class-group-list-request';
import { ClassGroupListByClassResponse } from '../../response/class-group/class-group-list-by-class-response';
import { ClassGroupListResponse } from '../../response/class-group/class-group-list-response';

@Injectable({
  providedIn: 'root'
})
export class AppClassGroupService {

  constructor(private httpClient: HttpClient) { }

  getClassGroupList(request: ClassGroupListRequest): Observable<ClassGroupListResponse> {
    return this.httpClient.post<ClassGroupListResponse>(`${environment.baseURL}${environment.INSTITUTE_CLASS_GROUP_LIST}`, request)
  }

  getClassGroupByClassSessionList(request: ClassGroupListByClassSessionRequest): Observable<ClassGroupListByClassResponse> {
    return this.httpClient.post<ClassGroupListByClassResponse>(`${environment.baseURL}${environment.INSTITUTE_CLASS_GROUP_LIST_BY_CLASS_SESSION}`, request)
  }

}
