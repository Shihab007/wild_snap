import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EducationSubjectListResponse } from '../../response/education-subject/education-subject-list-response';
import { EducationSubjectListRequest } from '../../request/education-subject/education-subject-list-request';
import { Observable } from 'rxjs';
import { EducationSubjectAddRequest } from '../../request/education-subject/education-subject-add-request';
import { EducationSubjectAddResponse } from '../../response/education-subject/education-subject-add-response';
import { EducationSubjectEditRequest } from '../../request/education-subject/education-subject-edit-request';
import { EducationSubjectEditResponse } from '../../response/education-subject/education-subject-edit-response';
import { EducationSubjectViewResponse } from '../../response/education-subject/education-subject-view-response';
import { EducationSubjectViewRequest } from '../../request/education-subject/education-subject-view-request';

@Injectable({
  providedIn: 'root'
})
export class EducationSubjectService {

  constructor(private httpClient: HttpClient) { }


  getEducationSubjectList(request: EducationSubjectListRequest): Observable<EducationSubjectListResponse> {
    return this.httpClient.post<EducationSubjectListResponse>(`${environment.baseURL}${environment.EDUCATION_SUBJECT_LIST}`, request)
  }

  getEducationSubjectAdd(request: EducationSubjectAddRequest): Observable<EducationSubjectAddResponse> {
    return this.httpClient.post<EducationSubjectAddResponse>(`${environment.baseURL}${environment.EDUCATION_SUBJECT_ADD}`, request)
  }

  getEducationSubjectEdit(request: EducationSubjectEditRequest): Observable<EducationSubjectEditResponse> {
    return this.httpClient.post<EducationSubjectEditResponse>(`${environment.baseURL}${environment.EDUCATION_SUBJECT_EDIT}`, request)
  }

  getEducationSubjectByOid(request: EducationSubjectViewRequest): Observable<EducationSubjectViewResponse> {
    return this.httpClient.post<EducationSubjectViewResponse>(`${environment.baseURL}${environment.EDUCATION_SUBJECT_BY_OID}`, request)
  }

}
