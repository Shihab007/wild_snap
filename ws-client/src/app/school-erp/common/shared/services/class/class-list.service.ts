import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassListRequest } from '../../request/class/class-list-request';
import { ClassListResponse } from '../../response/class/class-list-response';

@Injectable({
  providedIn: 'root'
})
export class ClassListService {

  constructor(private httpClient: HttpClient) { }

  getClassList(request: ClassListRequest): Observable<ClassListResponse> {
    return this.httpClient.post<ClassListResponse>(`${environment.baseURL}${environment.GET_EDUCATION_CLASS_LIST}`, request)
  }
}
