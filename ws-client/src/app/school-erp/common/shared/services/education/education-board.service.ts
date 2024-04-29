import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationBoardListRequest } from '../../request/education/education-board-list-request';
import { GetAllEducationShiftListV1Request } from '../../request/education/get-all-education-shift-list-request';
import { EducationBoardListResponse } from '../../response/education/education-board-list-response';
import { GetAllEducationShiftListV1Response } from '../../response/education/get-all-education-shift-list-response';


@Injectable({
  providedIn: 'root'
})
export class EducationBoardService {

  constructor(private httpClient: HttpClient) { }

  getEducationBoardList(educationBoardListRequest: EducationBoardListRequest): Observable<EducationBoardListResponse> {
    return this.httpClient.post<EducationBoardListResponse>(`${environment.baseURL}${environment.educationBoardList}`, educationBoardListRequest)
  }



}
