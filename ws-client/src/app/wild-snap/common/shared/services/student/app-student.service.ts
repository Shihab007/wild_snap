import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetClassSubjectListByStudentRequest } from '../../request/student/get-class-subject-list-by-student-request';
import { GetSubjectListByStudentIdRequest } from '../../request/student/get-subject-list-by-student-id-request';
import { AttendanceListRequest } from '../../request/student/student-attendance-list-request';
import { StudentEditRequest } from '../../request/student/student-edit-request';
import { StudentProfileRequest } from '../../request/student/student-profile-request';
import { StudentRequestList } from '../../request/student/student-request-list';
import { StudentListBySubjectRequest } from '../../request/student/student-request-list-by-subject';
import { StudentListByTextbookRequest } from '../../request/student/student-request-list-by-textbook';
import { StudentTextbookListRequest } from '../../request/student/student-textbook-list-request';
import { GetClassSubjectListByStudentResponse } from '../../response/student/get-class-subject-list-by-student-response';
import { GetSubjectListByStudentIdResponse } from '../../response/student/get-subject-list-by-student-id-response';
import { SectionStudentListResponse } from '../../response/student/section-student-list-response';
import { AttendanceListResponse } from '../../response/student/student-attendance-list-response';
import { StudentEditResponse } from '../../response/student/student-edit-response';
import { StudentListResponse } from '../../response/student/student-list-response';
import { StudentProfileResponse } from '../../response/student/student-profile-response';
import { StudentListBySubjectResponse } from '../../response/student/student-respons-list-by-subject';
import { StudentListByTextbookResponse } from '../../response/student/student-respons-list-by-textbook';
import { StudentTextbookListResponse } from '../../response/student/student-textbook-list-response';

@Injectable({
  providedIn: 'root'
})
export class AppStudentService {

  constructor(private httpClient: HttpClient) { }

  getStudentList(request: StudentRequestList): Observable<StudentListResponse> {
    return this.httpClient.post<StudentListResponse>(`${environment.baseURL}${environment.allStudentList}`, request)
  }

  getStudentListByTextbook(request: StudentListByTextbookRequest): Observable<StudentListByTextbookResponse> {
    return this.httpClient.post<StudentListByTextbookResponse>(`${environment.baseURL}${environment.STUDENT_LIST_BY_TEXTBOOK_OID}`, request)
  }

  getStudentListBySubject(request: StudentListBySubjectRequest): Observable<StudentListBySubjectResponse> {
    return this.httpClient.post<StudentListBySubjectResponse>(`${environment.baseURL}${environment.STUDENT_LIST_BY_SUBJECT_OID}`, request)
  }



  getSectionStudentList(request: StudentRequestList): Observable<SectionStudentListResponse> {
    return this.httpClient.post<SectionStudentListResponse>(`${environment.baseURL}${environment.allStudentList}`, request)
  }

  getStudentTextbookList(request: StudentTextbookListRequest): Observable<StudentTextbookListResponse> {
    return this.httpClient.post<StudentTextbookListResponse>(`${environment.baseURL}${environment.GET_STUDENT_TEXTBOOK_LIST}`, request)
  }

  getClassSubjectListByStudent(request: GetClassSubjectListByStudentRequest): Observable<GetClassSubjectListByStudentResponse> {
    return this.httpClient.post<GetClassSubjectListByStudentResponse>(`${environment.baseURL}${environment.GET_CLASS_SUBJECT_LIST_BY_STUDENT}`, request)
  }




  //   getStudentProfileInfo(request:StudentProfileRequest):Observable<StudentListResponse>{
  //     return this.httpClient.post<StudentListResponse>(`${environment.baseURL}${environment.allStudentList}`, request)
  //   }

  getStudentProfileInfo(request: StudentProfileRequest): Observable<StudentProfileResponse> {
    return this.httpClient.post<StudentProfileResponse>(`${environment.baseURL}${environment.GET_STUDENT_BY_OID}`, request)
  }


  updateStudent(request: StudentEditRequest): Observable<StudentEditResponse> {
    return this.httpClient.post<StudentEditResponse>(`${environment.baseURL}${environment.UPDATE_STUDENT}`, request)
  }

  getAttendanceList(request: AttendanceListRequest): Observable<AttendanceListResponse> {
    return this.httpClient.post<AttendanceListResponse>(`${environment.baseURL}${environment.GET_ATTENDANCE_BY_STUDENT_OID}`, request)
  }


}
