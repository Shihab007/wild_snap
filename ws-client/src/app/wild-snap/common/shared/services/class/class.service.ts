import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddClassRequest } from '../../request/class/add-class-request';
import { GetClassByOidRequest } from '../../request/class/get-class-by-oid-request';
import { GetClassListBySessionOidRequest } from '../../request/class/get-class-list-by-session-oid-request';
import { AddClassResponse } from '../../response/class/add-class-response';
import { GetClassByOidResponse } from '../../response/class/get-class-by-oid-response';
import { GetClassListBySessionOidResponse } from '../../response/class/get-class-list-by-session-oid-response';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private httpClient: HttpClient) { }


  addClass(request: AddClassRequest): Observable<AddClassResponse> {
    return this.httpClient.post<AddClassResponse>(`${environment.baseURL}${environment.createClass}`, request)
  }

  getClassByOid(request: GetClassByOidRequest): Observable<GetClassByOidResponse> {
    return this.httpClient.post<GetClassByOidResponse>(`${environment.baseURL}${environment.getClassByOid}`, request)
  }
  editClass(request: AddClassRequest): Observable<AddClassResponse> {
    return this.httpClient.post<AddClassResponse>(`${environment.baseURL}${environment.editClass}`, request)
  }

  getClassListBySessionOid(request: GetClassListBySessionOidRequest): Observable<GetClassListBySessionOidResponse> {
    return this.httpClient.post<GetClassListBySessionOidResponse>(`${environment.baseURL}${environment.getClassListBySessionOid}`, request)
  }

}
