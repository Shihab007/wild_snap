import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassSectionAddRequest } from '../../request/class-section/class-section-add-request';
import { ClassSectionListRequest } from '../../request/class-section/class-section-list-request';
import { GetSectionByOidRequest } from '../../request/class-section/get-section-by-oid-request';
import { ClassSectionAddResponse } from '../../response/class-section/class-section-add-response';
import { ClassSectionListResponse } from '../../response/class-section/class-section-list-response';
import { GetSectionByOidResponse } from '../../response/class-section/get-section-by-oid-response';
import { ApproveRejectClassSectionRequest } from '../../request/class-section/approve-reject-class-section-request';
import { ApproveRejectClassSectionResponse } from '../../response/class-section/approve-reject-class-section-response';
import { StudentClassSectionChangeRequest } from '../../request/class-section/student-class-section-change-request';
import { StudentClassSectionChangeResponse } from '../../response/class-section/student-class-section-change-response';

@Injectable({
  providedIn: 'root'
})
export class AppClassSectionService {

  constructor(private httpClient: HttpClient) { }

  addClassSection(request: ClassSectionAddRequest): Observable<ClassSectionAddResponse> {
    return this.httpClient.post<ClassSectionAddResponse>(`${environment.baseURL}${environment.createClassSection}`, request)
  }

  getClassSectionList(request: ClassSectionListRequest): Observable<ClassSectionListResponse> {
    return this.httpClient.post<ClassSectionListResponse>(`${environment.baseURL}${environment.INSTITUTE_CLASS_SECTION_LIST}`, request)
  }

  getSectionByOid(request: GetSectionByOidRequest): Observable<GetSectionByOidResponse> {
    return this.httpClient.post<GetSectionByOidResponse>(`${environment.baseURL}${environment.getSectionByOid}`, request)
  }

  editSection(request: ClassSectionAddRequest): Observable<ClassSectionAddResponse> {
    return this.httpClient.post<ClassSectionAddResponse>(`${environment.baseURL}${environment.editSection}`, request)
  }

  approveReject(request: ApproveRejectClassSectionRequest): Observable<ApproveRejectClassSectionResponse> {
    return this.httpClient.post<ApproveRejectClassSectionResponse>(`${environment.baseURL}${environment.APPROVE_REJECT_SECTION}`, request)
  }
  updateStudentSection(request: StudentClassSectionChangeRequest): Observable<StudentClassSectionChangeResponse> {
    return this.httpClient.post<StudentClassSectionChangeResponse>(`${environment.baseURL}${environment.UPDATE_STUDENT_CLASS_SECTION}`, request)
  }

}
