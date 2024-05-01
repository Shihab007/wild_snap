import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassTestAddRequest } from '../../request/class-test/class-test-add-request';
import { ClassTestByOidRequest } from '../../request/class-test/class-test-by-oid-request';
import { ClassTestEditRequest } from '../../request/class-test/class-test-edit-request';
import { ClassTestListRequest } from '../../request/class-test/class-test-list-request';
import { ClassTestMarkAddRequest } from '../../request/class-test/class-test-mark-add-request';
import { ClassTestMarkEditRequest } from '../../request/class-test/class-test-mark-edit-request';
import { ClassTestAddResponse } from '../../response/class-test/class-test-add-response';
import { ClassTestByOidResponse } from '../../response/class-test/class-test-by-oid-response';
import { ClassTestEditResponse } from '../../response/class-test/class-test-edit-response';
import { ClassTestListResponse } from '../../response/class-test/class-test-list-response';
import { ClassTestMarkAddResponse } from '../../response/class-test/class-test-mark-add-response';
import { ClassTestMarkEditResponse } from '../../response/class-test/class-test-mark-edit-response';

@Injectable({
  providedIn: 'root'
})
export class ClassTestService {

  constructor(private httpClient: HttpClient) { }

  getClassTestList(request: ClassTestListRequest): Observable<ClassTestListResponse> {
    return this.httpClient.post<ClassTestListResponse>(`${environment.baseURL}${environment.getClassTestList}`, request)
  }

  addClassTest(request: ClassTestAddRequest): Observable<ClassTestAddResponse> {
    return this.httpClient.post<ClassTestAddResponse>(`${environment.baseURL}${environment.addClassTes}`, request)
  }

  getClassTestByOid(request: ClassTestByOidRequest): Observable<ClassTestByOidResponse> {
    return this.httpClient.post<ClassTestByOidResponse>(`${environment.baseURL}${environment.getClassTestByOid}`, request)
  }

  editClassTestByOid(request: ClassTestEditRequest): Observable<ClassTestEditResponse> {
    return this.httpClient.post<ClassTestEditResponse>(`${environment.baseURL}${environment.editClassTestByOid}`, request)
  }

  addClassTestMark(request: ClassTestMarkAddRequest): Observable<ClassTestMarkAddResponse> {
    return this.httpClient.post<ClassTestMarkAddResponse>(`${environment.baseURL}${environment.saveClassTestMark}`, request)
  }

  editClassTestMark(request: ClassTestMarkEditRequest): Observable<ClassTestMarkEditResponse> {
    return this.httpClient.post<ClassTestMarkEditResponse>(`${environment.baseURL}${environment.updateClassRestMark}`, request)
  }
}
