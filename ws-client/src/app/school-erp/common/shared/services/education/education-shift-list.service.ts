import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationShiftByOidRequest } from '../../request/education/education-shift-by-oid-request ';
import { EducationShiftListRequest } from '../../request/education/education-shift-list-request';
import { GetAllEducationShiftListV1Request } from '../../request/education/get-all-education-shift-list-request';
import { EducationShiftListResponse } from '../../response/education/education-shift-list-response';
import { GetAllEducationShiftByOidV1Response } from '../../response/education/get-all-education-shift-by-oid-response';
import { GetAllEducationShiftListV1Response } from '../../response/education/get-all-education-shift-list-response';

@Injectable({
  providedIn: 'root'
})
export class EducationShiftListService {

  constructor(private httpClient: HttpClient) { }


  getEducationShiftList(educationShiftListRequest: EducationShiftListRequest): Observable<EducationShiftListResponse> {
    return this.httpClient.post<EducationShiftListResponse>(`${environment.baseURL}${environment.instituteShiftList}`, educationShiftListRequest)
  }

  getAllEducationShiftList(educationBoardListRequest: GetAllEducationShiftListV1Request): Observable<GetAllEducationShiftListV1Response> {
    return this.httpClient.post<GetAllEducationShiftListV1Response>(`${environment.baseURL}${environment.educationShiftList}`, educationBoardListRequest)
  }

  getAllEducationShift(educationBoardListRequest: EducationShiftByOidRequest): Observable<GetAllEducationShiftByOidV1Response> {
    return this.httpClient.post<GetAllEducationShiftByOidV1Response>(`${environment.baseURL}${environment.educationShift}`, educationBoardListRequest)
  }
}
