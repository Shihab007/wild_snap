import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetTeacherAttendanceDetailsRequest } from '../../request/attendance/get-teacher-attendance-details-request';
import { GetTeacherAttendanceRequest } from '../../request/attendance/get-teacher-attendance-request';
import { SaveTeacherAttendanceRequest } from '../../request/attendance/save-teacher-attendance-request';
import { TeacherAttendanceListRequest } from '../../request/attendance/teacher-attendance-list-request';
import { GetTeacherAttendanceDetailsResponse } from '../../response/attendance/get-teacher-attendance-details-response';
import { GetTeacherAttendanceResponse } from '../../response/attendance/get-teacher-attendance-response';
import { SaveTeacherAttendanceResponse } from '../../response/attendance/save-teacher-attendance-response';
import { TeacherAttendanceListResponse } from '../../response/attendance/teacher-attendance-list-response';

@Injectable({
  providedIn: 'root'
})
export class TeacherAttendanceService {
  constructor(private httpClient: HttpClient) { }

  getTeacherAttendanceList(request: TeacherAttendanceListRequest): Observable<TeacherAttendanceListResponse> {
    return this.httpClient.post<TeacherAttendanceListResponse>(
      `${environment.baseURL}${environment.getTeacherAttendanceListByOid}`, request);
  }

  getTeacherAttendance(request: GetTeacherAttendanceRequest): Observable<GetTeacherAttendanceResponse> {
    return this.httpClient.post<GetTeacherAttendanceResponse>(
      `${environment.baseURL}${environment.getTeacherAttendance}`, request);
  }

  saveAndUpdateTeacherAttendance(request: SaveTeacherAttendanceRequest): Observable<SaveTeacherAttendanceResponse> {
    return this.httpClient.post<SaveTeacherAttendanceResponse>(
      `${environment.baseURL}${environment.saveAndUpdateTeacherAttendance}`, request);
  }

  getTeacherAttendanceDetailsByOid(request: GetTeacherAttendanceDetailsRequest): Observable<GetTeacherAttendanceDetailsResponse> {
    return this.httpClient.post<GetTeacherAttendanceDetailsResponse>(
      `${environment.baseURL}${environment.getTeacherAttendanceDetailsByOid}`, request);
  }
}
