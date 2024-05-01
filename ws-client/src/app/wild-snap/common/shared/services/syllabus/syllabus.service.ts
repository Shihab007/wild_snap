import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SyllabusListRequest } from '../../request/syllabus/syllabus-list-request';
import { SyllabusListResponse } from '../../response/syllabus/syllabus-list-response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SyllabusByOidRequest } from '../../request/syllabus/syllabus-by-oid-request';
import { SyllabusByOidResponse } from '../../response/syllabus/syllabus-by-oid-response';
import { SaveSyllabusRequest } from '../../request/syllabus/save-syllabus-request';
import { SaveSyllabusResponse } from '../../response/syllabus/save-syllabus-response';
import { UpdateSyllabusRequest } from '../../request/syllabus/update-syllabus-request';
import { UpdateSyllabusResponse } from '../../response/syllabus/update-syllabus-response';
@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(private httpClient: HttpClient) { }

  getSyllabusList(request: SyllabusListRequest): Observable<SyllabusListResponse> {
    return this.httpClient.post<SyllabusListResponse>(`${environment.baseURL}${environment.GET_SYLLABUS_LIST}`, request)
  }

  getSyllabusByOid(request: SyllabusByOidRequest): Observable<SyllabusByOidResponse> {
    return this.httpClient.post<SyllabusByOidResponse>(`${environment.baseURL}${environment.GET_SYLLABUS_BY_OID}`, request)
  }

  saveSyllabus(request: SaveSyllabusRequest): Observable<SaveSyllabusResponse> {
    return this.httpClient.post<SaveSyllabusResponse>(`${environment.baseURL}${environment.SAVE_SYLLABUS}`, request)
  }

  updateSyllabus(request: UpdateSyllabusRequest): Observable<UpdateSyllabusResponse> {
    return this.httpClient.post<UpdateSyllabusResponse>(`${environment.baseURL}${environment.UPDATE_SYLLABUS}`, request)
  }
}
