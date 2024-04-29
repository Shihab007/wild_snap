import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdmissionFormRequest } from '../model/admission-form-request';
import { AdmissionFormResponse } from '../model/admission-form-response';

@Injectable({
  providedIn: 'root'
})
export class AdmissionFormService {

  constructor(private httpClient: HttpClient) { }

  submitAdmissionForm(request: AdmissionFormRequest): Observable<AdmissionFormResponse> {
    return this.httpClient.post<AdmissionFormResponse>(`${environment.baseURL}${environment.admissionForm}`, request);
  }

  submitAdmissionApplicationForm(request: AdmissionFormRequest): Observable<AdmissionFormResponse> {
    return this.httpClient.post<AdmissionFormResponse>(`${environment.baseURL}${environment.admissionApplicationForm}`, request);
  }

  updateAdmissionApplicationForm(request: AdmissionFormRequest): Observable<AdmissionFormResponse> {
    return this.httpClient.post<AdmissionFormResponse>(`${environment.baseURL}${environment.updateAdmissionApplicationForm}`, request);
  }

}
