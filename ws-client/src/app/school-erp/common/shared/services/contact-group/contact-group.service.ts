import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ContactGroupListRequest } from "../../request/contact-group/contact-group-list-request";
import { ContactGroupUpdateRequest } from "../../request/contact-group/contact-group-update-request";
import { ContactGroupViewDetailsRequest } from "../../request/contact-group/contact-group-view-details-request";
import { CreateContactGroupRequest } from "../../request/contact-group/create-contact-group-request";
import { ContactGroupListResponse } from "../../response/contact-group/contact-group-list-response";
import { ContactGroupUpdateResponse } from "../../response/contact-group/contact-group-update-response";
import { ContactGroupViewDetailsResponse } from "../../response/contact-group/contact-group-view-details-response";
import { CreateContactGroupResponse } from "../../response/contact-group/create-contact-group-response";

@Injectable({
  providedIn: 'root'
})
export class ContactGroupService {

  constructor(private httpClient: HttpClient) { }

  getContactGroupList(request: ContactGroupListRequest): Observable<ContactGroupListResponse> {
    return this.httpClient.post<ContactGroupListResponse>(`${environment.baseURL}${environment.contactGroupList}`, request)
  }

  createContactGroupList(request: CreateContactGroupRequest): Observable<CreateContactGroupResponse> {
    return this.httpClient.post<CreateContactGroupResponse>(`${environment.baseURL}${environment.createContactGroup}`, request)
  }

  getContactGroupDetailsView(request: ContactGroupViewDetailsRequest): Observable<ContactGroupViewDetailsResponse> {
    return this.httpClient.post<ContactGroupViewDetailsResponse>(`${environment.baseURL}${environment.contactGroupDetailsByOid}`, request)
  }

  updateContactGroup(request: ContactGroupUpdateRequest): Observable<ContactGroupUpdateResponse> {
    return this.httpClient.post<ContactGroupUpdateResponse>(`${environment.baseURL}${environment.updateContactGroup}`, request)
  }

}