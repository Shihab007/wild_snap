import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationTypeListRequest } from '../../request/education/education-type-list-request';
import { EducationTypeListResponse } from '../../response/education/education-type-list-response';

@Injectable({
  providedIn: 'root'
})
export class EducationTypeService {
  constructor(private httpClient: HttpClient) { }

  getInstituteTypeList(educationTypeListRequest:EducationTypeListRequest):Observable<EducationTypeListResponse>{
    return this.httpClient.post<EducationTypeListResponse>(`${environment.baseURL}${environment.instituteTypeList}`, educationTypeListRequest)
  }


  educationTypeList(educationTypeListRequest:EducationTypeListRequest):Observable<EducationTypeListResponse>{
    return this.httpClient.post<EducationTypeListResponse>(`${environment.baseURL}${environment.educationTypeList}`, educationTypeListRequest)
  }
}
