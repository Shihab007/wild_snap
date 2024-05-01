import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminEducationCurriculumCreateRequest } from '../../request/curriculum/admin-education-curriculum-create-request';
import { AdminEducationCurriculumListRequest } from '../../request/curriculum/admin-education-curriculum-list-request';
import { AdminEducationCurriculumUpdateRequest } from '../../request/curriculum/admin-education-curriculum-update-request';
import { AdminEducationCurriculumViewRequest } from '../../request/curriculum/admin-education-curriculum-view-request';
import { EducationMediumListRequest } from '../../request/education-medium/education-medium-list-request';
import { GetEducationInfoRequest } from '../../request/education/get-education-info-request';
import { GetInstituteSubjectListRequest } from '../../request/education/get-institute-subject-list-request';
import { AdminEducationCurriculumCreateResponse } from '../../response/curriculum/admin-education-curriculum-create-response';
import { AdminEducationCurriculumListResponse } from '../../response/curriculum/admin-education-curriculum-list-response';
import { AdminEducationCurriculumUpdateResponse } from '../../response/curriculum/admin-education-curriculum-update-response';
import { AdminEducationCurriculumViewResponse } from '../../response/curriculum/admin-education-curriculum-view-response';
import { EducationMediumListResponse } from '../../response/education-medium/education-medium-list-response';
import { GetEducationInfoResponse } from '../../response/education/get-education-info-response';
import { GetInstituteSubjectListResponse } from '../../response/education/get-institute-subject-list-response';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private httpClient: HttpClient) { }

  // Admin Service API

  getEducationInfo(request: GetEducationInfoRequest): Observable<GetEducationInfoResponse> {
    return this.httpClient.post<GetEducationInfoResponse>(`${environment.baseURL}${environment.GET_EDUCATION_INFO}`, request)
  }


  getInstituteSubjectList(request: GetInstituteSubjectListRequest): Observable<GetInstituteSubjectListResponse> {
    return this.httpClient.post<GetInstituteSubjectListResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_SUBJECT_LIST}`, request)
  }


  getAllSubjectList(request: GetInstituteSubjectListRequest): Observable<GetInstituteSubjectListResponse> {
    return this.httpClient.post<GetInstituteSubjectListResponse>(`${environment.baseURL}${environment.SUBJECT_LIST}`, request)
  }

  getEducationCurriculumList(request: AdminEducationCurriculumListRequest): Observable<AdminEducationCurriculumListResponse> {
    return this.httpClient.post<AdminEducationCurriculumListResponse>(`${environment.baseURL}${environment.EDUCATION_CURRICULUM_LIST}`, request)
  }

  // createEducationCurriculumList(request: AdminEducationCurriculumCreateRequest): Observable<AdminEducationCurriculumCreateResponseBody> {
  //   return this.httpClient.post<AdminEducationCurriculumCreateResponseBody>(`${environment.baseURL}${environment.CREATE_EDUCATION_CURRICULUM
  //     }`, request)
  // }

  getEducationMedium(request: EducationMediumListRequest): Observable<EducationMediumListResponse> {
    return this.httpClient.post<EducationMediumListResponse>(`${environment.baseURL}${environment.GET_EDUCATION_MEDIUM}`, request)
  }
  createEducationCurriculum(request: AdminEducationCurriculumCreateRequest): Observable<AdminEducationCurriculumCreateResponse> {
    return this.httpClient.post<AdminEducationCurriculumCreateResponse>(`${environment.baseURL}${environment.CREATE_EDUCATION_CURRICULUM}`, request)
  }

  updateEducationCurriculum(request: AdminEducationCurriculumUpdateRequest): Observable<AdminEducationCurriculumUpdateResponse> {
    return this.httpClient.post<AdminEducationCurriculumUpdateResponse>(`${environment.baseURL}${environment.UPDATE_EDUCATION_CURRICULUM}`, request)
  }

  getEducationCurriculum(request: AdminEducationCurriculumViewRequest): Observable<AdminEducationCurriculumViewResponse> {
    return this.httpClient.post<AdminEducationCurriculumViewResponse>(`${environment.baseURL}${environment.GET_EDUCATION_CURRICULUM}`, request)
  }



}
