import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRoleListRequest } from '../../request/user/user-role-list-request';
import { UserRoleListResponse } from '../../response/user/user-role-list-response';

@Injectable({
  providedIn: 'root'
})
export class UserRoleListService {

  constructor(private httpClient: HttpClient) { }


  getUserRoleList(request: UserRoleListRequest): Observable<UserRoleListResponse> {
    return this.httpClient.post<UserRoleListResponse>(`${environment.baseURL}${environment.USER_ROLE_LIST}`, request)
  }
}
