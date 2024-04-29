import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AdmissionListRequest } from "../../request/admission/admission-list-request";
import { AdmissionRequest } from "../../request/admission/admission-request";
import { AdmissionSelectionRequest } from "../../request/admission/admission-selection-request";
import { AllSectionByParticularClassSectionRequest } from "../../request/admission/all-section-by-particular-class-section-request";
import { ApproveAdmissionRequest } from "../../request/admission/approve-admission-request";
import { StudentAddRequest } from "../../request/student/student-add-request";
import { AdmissionListResponse } from "../../response/admission/admission-list-response";
import { AdmissionResponse } from "../../response/admission/admission-response";
import { AdmissionSelectionResponse } from "../../response/admission/admission-selection-response";
import { AllSectionByParticularClassSectionResponse } from "../../response/admission/all-section-by-particular-class-section-response";
import { ApproveAdmissionResponse } from "../../response/admission/approve-admission-response";
import { StudentAddResponse } from "../../response/student/student-add-response";

@Injectable({
  providedIn: "root",
})
export class AdmissionService {
  constructor(private httpClient: HttpClient) { }

  //   getAdmissionList(
  //     request: AdmissionListRequest
  //   ): Observable<AdmissionListResponse> {
  //     return this.httpClient.post<AdmissionListResponse>(
  //       `${environment.baseURL}${environment.allAdmissionList}`,
  //       AdmissionListRequest
  //     );
  //   }

  getAdmissionList(allAdmissionListRequest: AdmissionListRequest): Observable<AdmissionListResponse> {
    return this.httpClient.post<AdmissionListResponse>(
      `${environment.baseURL}${environment.allAdmissionList}`, allAdmissionListRequest);
  }


  getAdmissionView(request: AdmissionRequest): Observable<AdmissionResponse> {
    return this.httpClient.post<AdmissionResponse>(
      `${environment.baseURL}${environment.ADMISSION_APPLICATION_BY_OID}`, request);
  }


  getAllSectionByParticularSectionList(request: AllSectionByParticularClassSectionRequest): Observable<AllSectionByParticularClassSectionResponse> {
    return this.httpClient.post<AllSectionByParticularClassSectionResponse>(
      `${environment.baseURL}${environment.allSectionByParicularClassSection}`, request);
  }



  approveAdmission(request: ApproveAdmissionRequest): Observable<ApproveAdmissionResponse> {
    return this.httpClient.post<ApproveAdmissionResponse>(
      `${environment.baseURL}${environment.approveAdmission}`, request);
  }

  admitStudent(request: StudentAddRequest): Observable<StudentAddResponse> {
    return this.httpClient.post<StudentAddResponse>(
      `${environment.baseURL}${environment.approveAdmission}`, request);
  }

  addStudent(request: StudentAddRequest): Observable<StudentAddResponse> {
    return this.httpClient.post<StudentAddResponse>(
      `${environment.baseURL}${environment.ADD_STUDENT}`, request);
  }

  admissionSelection(request: AdmissionSelectionRequest): Observable<AdmissionSelectionResponse> {
    return this.httpClient.post<AdmissionSelectionResponse>(
      `${environment.baseURL}${environment.ADMISSION_SELECTION}`, request);
  }

}
