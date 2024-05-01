import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveStudentAttendanceRequest } from '../../request/attendance/save-student-attendance-request';

import { StudentAttendanceListRequest } from '../../request/attendance/student-attendance-list-request';
import { StudentAttendanceDetailsRequest } from '../../request/attendance/student-attendance-detail-request';
import { StudentAttendanceDetailsResponse } from '../../response/attendance/student-attendance-details-response';
import { StudentAttendanceListResponse } from '../../response/attendance/student-attendance-list-response';
import { StudentAttendanceRequest } from '../../request/attendance/student-attendance-request';
import { StudentAttendanceResponse } from '../../response/attendance/student-attendance-response';
import { StudentAttendanceByOidRequest } from '../../request/attendance/student-attendance-by-oid-request';
import { StudentAttendanceByOidResponse } from '../../response/attendance/student-attendance-by-oid-response';
import { CheckAttendanceRequest } from '../../request/attendance/check-attendance-request';
import { CheckAttendanceResponse } from '../../response/attendance/check-attendance-response';
import { AttendanceReportBySectionRequest,  } from '../../request/attendance/attendance-report-by-section-request';
import { AttendanceReportResponse } from '../../response/attendance/attendance-report-response';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {

  constructor(private httpClient: HttpClient) { }


  getAttendanceList(request: StudentAttendanceListRequest): Observable<StudentAttendanceListResponse> {
    return this.httpClient.post<StudentAttendanceListResponse>(
      `${environment.baseURL}${environment.getStudentAttendanceList}`, request);
  }

  saveStudentAttendance(request: StudentAttendanceRequest): Observable<StudentAttendanceResponse> {
    return this.httpClient.post<StudentAttendanceResponse>(
      `${environment.baseURL}${environment.saveStudentAttendance}`, request);
  }

  updateStudentAttendance(request: StudentAttendanceRequest): Observable<StudentAttendanceResponse> {
    return this.httpClient.post<StudentAttendanceResponse>(
      `${environment.baseURL}${environment.UPDATE_STUDENT_ATTENDANCE}`, request);
  }


  getStudentAttendanceByOid(request: StudentAttendanceByOidRequest): Observable<StudentAttendanceByOidResponse> {
    return this.httpClient.post<StudentAttendanceByOidResponse>(
      `${environment.baseURL}${environment.GET_STUDENT_ATTENDANCE_BY_OID}`, request);
  }

  getStudentAttendanceDetails(request: StudentAttendanceDetailsRequest): Observable<StudentAttendanceDetailsResponse> {
    return this.httpClient.post<StudentAttendanceDetailsResponse>(
      `${environment.baseURL}${environment.studentAttendanceDetails}`, request);
  }
  
  checkAttendance(request: CheckAttendanceRequest): Observable<CheckAttendanceResponse> {
    return this.httpClient.post<CheckAttendanceResponse>(`${environment.baseURL}${environment.CHECK_ATTENDANCE}`, request)
  }

}
