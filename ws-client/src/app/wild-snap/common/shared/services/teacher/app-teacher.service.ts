import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { SchoolTeacherEditRequest } from "../../request/teacher/school-teacher-edit-request"
import { TeacherEditRequest } from "../../request/teacher/teacher-edit-request"
import { TeacherListRequest } from "../../request/teacher/teacher-list-request"
import { TeacherProfileRequest } from "../../request/teacher/teacher-profile-request"
import { SchoolTeacherEditResponse } from "../../response/teacher/school-teacher-edit-response"
import { TeacherEditResponse } from "../../response/teacher/teacher-edit-response"
import { TeacherListResponse } from "../../response/teacher/teacher-list-response"
import { TeacherProfileResponse } from "../../response/teacher/teacher-profile-response"
import { ApproveRejectTeacherRequest } from "../../request/teacher/approve-reject-teacher-request"
import { ApproveRejectTeacherResponse } from "../../response/teacher/approve-reject-teacher-response"

@Injectable({
  providedIn: 'root'
})
export class AppTeacherService {

  constructor(private httpClient: HttpClient) { }

  getTeacherProfileInfo(request: TeacherProfileRequest): Observable<TeacherProfileResponse> {
    return this.httpClient.post<TeacherProfileResponse>(`${environment.baseURL}${environment.GET_TEACHER_BY_OID}`, request)
  }


  getTeacherList(request: TeacherListRequest): Observable<TeacherListResponse> {
    return this.httpClient.post<TeacherListResponse>(`${environment.baseURL}${environment.GET_TEACHER_LIST}`, request)
  }

  updateTeacher(request: TeacherEditRequest): Observable<TeacherEditResponse> {
    return this.httpClient.post<TeacherEditResponse>(`${environment.baseURL}${environment.UPDATE_TEACHER
      }`, request)
  }

  updateSchoolTeacher(request: SchoolTeacherEditRequest): Observable<SchoolTeacherEditResponse> {
    return this.httpClient.post<SchoolTeacherEditResponse>(`${environment.baseURL}${environment.UPDATE_TEACHER
      }`, request)
  }

  approveReject(request: ApproveRejectTeacherRequest): Observable<ApproveRejectTeacherResponse> {
    return this.httpClient.post<ApproveRejectTeacherResponse>(`${environment.baseURL}${environment.APPROVE_REJECT_TEACHER
      }`, request)
  }

}
