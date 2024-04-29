import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigureEducationSessionRequest } from '../../request/education/configure-education-session-request';
import { EditEducationSessionRequest } from '../../request/education/edit-education-session-request';
import { GetEducationSessionInstituteListRequest } from '../../request/education/get-education-session-institute-list-request';
import { GetEducationSessionListRequest } from '../../request/education/get-education-session-list-request';
import { GetEducationSessionRequest } from '../../request/education/get-education-session-request';
import { SaveEducationSessionRequest } from '../../request/education/save-education-session-request';
import { ConfigureEducationSessionResponse } from '../../response/education/configure-education-session-response';
import { EditEducationSessionResponse } from '../../response/education/edit-education-session-response';
import { GetEducationSessionInstituteListResponse } from '../../response/education/get-education-session-institute-list-response';
import { GetEducationSessionListResponse } from '../../response/education/get-education-session-list-response';
import { GetEducationSessionResponse } from '../../response/education/get-education-session-response';
import { SaveEducationSessionResponse } from '../../response/education/save-education-session-response';

@Injectable({
  providedIn: 'root'
})
export class EducationSessionService {

  constructor(private httpClient: HttpClient) { }

  educationSessionList(educationSessionListRequest: GetEducationSessionListRequest): Observable<GetEducationSessionListResponse> {
    return this.httpClient.post<GetEducationSessionListResponse>(`${environment.baseURL}${environment.educationSessionList}`, educationSessionListRequest)
  }
  saveEducationSession(saveEducationSessionRequest: SaveEducationSessionRequest): Observable<SaveEducationSessionResponse> {
    return this.httpClient.post<SaveEducationSessionResponse>(`${environment.baseURL}${environment.saveEducationSession}`, saveEducationSessionRequest)
  }
  editEducationSession(editEducationSessionRequest: EditEducationSessionRequest): Observable<EditEducationSessionResponse> {
    return this.httpClient.post<EditEducationSessionResponse>(`${environment.baseURL}${environment.editEducationSession}`, editEducationSessionRequest)
  }

  getEducationSessionByOid(getEducationSessionRequest: GetEducationSessionRequest): Observable<GetEducationSessionResponse> {
    return this.httpClient.post<GetEducationSessionResponse>(`${environment.baseURL}${environment.getEducationSessionByOid}`, getEducationSessionRequest)
  }

  educationSessionInstituteList(educationSessionInstituteListRequest: GetEducationSessionInstituteListRequest): Observable<GetEducationSessionInstituteListResponse> {
    return this.httpClient.post<GetEducationSessionInstituteListResponse>(`${environment.baseURL}${environment.educationSessionInstituteList}`, educationSessionInstituteListRequest)
  }

  configureEducationSession(request: ConfigureEducationSessionRequest): Observable<ConfigureEducationSessionResponse> {
    return this.httpClient.post<ConfigureEducationSessionResponse>(`${environment.baseURL}${environment.configureEducationSession}`, request)
  }


}
