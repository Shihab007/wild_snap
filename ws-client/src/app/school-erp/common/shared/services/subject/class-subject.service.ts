import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassSubjectListRequest } from '../../request/subject/class-subject-list-request';
import { ClassSubjectListResponse } from '../../response/subject/class-subject-list-response';
import { SubjectSettingRequest } from '../../request/subject-setting/subject-setting-request';
import { SubjectSettingResponse } from '../../response/subject-setting/subject-setting-response';
import { UpdateSubjectSettingRequest } from '../../request/subject-setting/update-subject-setting-request';
import { UpdateSubjectSettingResponse } from '../../response/subject-setting/update-subject-setting-response';

@Injectable({
  providedIn: 'root'
})
export class ClassSubjectService {

  constructor(private httpClient: HttpClient) { }

  getClassSubjectList(request: ClassSubjectListRequest): Observable<ClassSubjectListResponse> {
    return this.httpClient.post<ClassSubjectListResponse>(`${environment.baseURL}${environment.getClassSubjectList}`, request)
  }

  getSubjectSetting(request: SubjectSettingRequest): Observable<SubjectSettingResponse> {
    return this.httpClient.post<SubjectSettingResponse>(`${environment.baseURL}${environment.GET_SUBJECT_MARK_DISTRIBUTION}`, request)
  }
  updateSubjectSetting(request: UpdateSubjectSettingRequest): Observable<UpdateSubjectSettingResponse> {
    return this.httpClient.post<UpdateSubjectSettingResponse>(`${environment.baseURL}${environment.UPDATE_SUBJECT_MARK_DISTRIBUTION}`, request)
  }
}

