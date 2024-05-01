import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactByOidRequest } from '../../request/contact/contact-by-oid-request';
import { ContactListByGuardianRequest } from '../../request/contact/contact-list-by-guardian-request';
import { ContactListByOthersRequest } from '../../request/contact/contact-list-by-others-request';
import { ContactListByStudentRequest } from '../../request/contact/contact-list-by-student-request';
import { ContactListByTeacherRequest } from '../../request/contact/contact-list-by-teacher-request';
import { ContactListRequest } from '../../request/contact/contact-list-request';
import { CreateContactRequest } from '../../request/contact/create-contact-request';
import { EditContactRequest } from '../../request/contact/edit-contact-request';
import { ContactByOidResponse } from '../../response/contact/contact-by-oid-response';
import { ContactListByGuardianResponse } from '../../response/contact/contact-list-by-guardian-response';
import { ContactListByOthersResponse } from '../../response/contact/contact-list-by-others-response';
import { ContactListByStudentResponse } from '../../response/contact/contact-list-by-student-response';
import { ContactListByTeacherResponse } from '../../response/contact/contact-list-by-teacher-response';
import { ContactListResponse } from '../../response/contact/contact-list-response';
import { CreateContactResponse } from '../../response/contact/create-contact-response';
import { EditContactResponse } from '../../response/contact/edit-contact-response';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  createContact(request: CreateContactRequest): Observable<CreateContactResponse> {
    return this.httpClient.post<CreateContactResponse>(`${environment.baseURL}${environment.createContact}`, request)
  }

  getContactList(request: ContactListRequest): Observable<ContactListResponse> {
    return this.httpClient.post<ContactListResponse>(`${environment.baseURL}${environment.contactList}`, request)
  }

  getContactByOid(request: ContactByOidRequest): Observable<ContactByOidResponse> {
    return this.httpClient.post<ContactByOidResponse>(`${environment.baseURL}${environment.contactByOid}`, request)
  }

  editContact(request: EditContactRequest): Observable<EditContactResponse> {
    return this.httpClient.post<EditContactResponse>(`${environment.baseURL}${environment.editContact}`, request)
  }

  getContactListByStudent(request: ContactListByStudentRequest): Observable<ContactListByStudentResponse> {
    return this.httpClient.post<ContactListByStudentResponse>(`${environment.baseURL}${environment.contactListByStudent}`, request)
  }

  getContactListByGiardian(request: ContactListByGuardianRequest): Observable<ContactListByGuardianResponse> {
    return this.httpClient.post<ContactListByGuardianResponse>(`${environment.baseURL}${environment.contactListByGuardian}`, request)
  }

  getContactListByOthers(request: ContactListByOthersRequest): Observable<ContactListByOthersResponse> {
    return this.httpClient.post<ContactListByOthersResponse>(`${environment.baseURL}${environment.contactListByOthers}`, request)
  }

  getContactListByTeacher(request: ContactListByTeacherRequest): Observable<ContactListByTeacherResponse> {
    return this.httpClient.post<ContactListByTeacherResponse>(`${environment.baseURL}${environment.contactListByTeacher}`, request)
  }

}
