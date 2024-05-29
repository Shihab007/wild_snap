import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdmissionFormResponse } from '../model/admission-form-response';
import { RegistrationFormRequest } from '../model/admission-form-request';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {

  constructor(private httpClient: HttpClient) { }

  submitAdmissionForm(request: RegistrationFormRequest): Observable<AdmissionFormResponse> {
    return this.httpClient.post<AdmissionFormResponse>(`${environment.baseURL}${environment.admissionForm}`, request);
  }

  submitUserRegistrationForm(request: RegistrationFormRequest): Observable<AdmissionFormResponse> {
    return this.httpClient.post<AdmissionFormResponse>(`${environment.baseURL}${environment.RegistrationApplicationForm}`, request);
  }

  updateAdmissionApplicationForm(request: RegistrationFormRequest): Observable<AdmissionFormResponse> {
    return this.httpClient.post<AdmissionFormResponse>(`${environment.baseURL}${environment.updateAdmissionApplicationForm}`, request);
  }

}
