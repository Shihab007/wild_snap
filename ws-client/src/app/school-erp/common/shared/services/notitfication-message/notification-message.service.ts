import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetByOidCommonRequest } from '../../request/common/get-by-oid-common-request';
import { GetListCommonRequest } from '../../request/common/get-list-common-request';
import { SaveMessageScheduleRequest } from '../../request/notification-message/save-message-schedule-request';
import { SaveMessageTemplateRequest } from '../../request/notification-message/save-message-template-request';
import { GetMessageJobByOidResponse } from '../../response/notification-message/get-message-job-by-oid-response';
import { GetMessageJobListResponse } from '../../response/notification-message/get-message-job-list-response';
import { GetMessageScheduleByOidResponse } from '../../response/notification-message/get-message-schedule-by-oid-response';
import { GetMessageScheduleListResponse } from '../../response/notification-message/get-message-schedule-list-response';
import { GetMessageTemplateByOidResponse } from '../../response/notification-message/get-message-template-by-oid-response';
import { GetMessageTemplateListResponse } from '../../response/notification-message/get-message-template-list-response';
import { GetMessageTemplateParameterListResponse } from '../../response/notification-message/get-message-template-parameter-list-response';
import { SaveMessageScheduleResponse } from '../../response/notification-message/save-message-schedule-response';
import { SaveMessageTemplateResponse } from '../../response/notification-message/save-message-template-response';

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  constructor(private httpClient: HttpClient) { }

  // MESSAGE TEMPLATE

  saveMessageTemplate(request: SaveMessageTemplateRequest): Observable<SaveMessageTemplateResponse> {
    return this.httpClient.post<SaveMessageTemplateResponse>(`${environment.baseURL}${environment.SAVE_MESSAGE_TEMPLATE_SERVICE}`, request)
  }

  updateMessageTemplate(request: SaveMessageTemplateRequest): Observable<SaveMessageTemplateResponse> {
    return this.httpClient.post<SaveMessageTemplateResponse>(`${environment.baseURL}${environment.UPDATE_MESSAGE_TEMPLATE_SERVICE}`, request)
  }

  getMessageTemplateList(request: GetListCommonRequest): Observable<GetMessageTemplateListResponse> {
    return this.httpClient.post<GetMessageTemplateListResponse>(`${environment.baseURL}${environment.GET_MESSAGE_TEMPLATE_LIST}`, request)
  }

  getMessageTemplateByOid(request: GetByOidCommonRequest): Observable<GetMessageTemplateByOidResponse> {
    return this.httpClient.post<GetMessageTemplateByOidResponse>(`${environment.baseURL}${environment.GET_MESSAGE_TEMPLATE_BY_OID}`, request)
  }

  // MESSAGE TEMLATE PARAMETER LIST
  getMessageTemplateParameterList(request: GetListCommonRequest): Observable<GetMessageTemplateParameterListResponse> {
    return this.httpClient.post<GetMessageTemplateParameterListResponse>(`${environment.baseURL}${environment.GET_MESSAGE_TEMPLATE_PARAMETER_LIST}`, request)
  }

  // MESSAGE SCHEDULE

  saveMessageSchedule(request: SaveMessageScheduleRequest): Observable<SaveMessageScheduleResponse> {
    return this.httpClient.post<SaveMessageScheduleResponse>(`${environment.baseURL}${environment.SAVE_MESSAGE_SCHEDULE_SERVICE}`, request)
  }

  updateMessageSchedule(request: SaveMessageScheduleRequest): Observable<SaveMessageScheduleResponse> {
    return this.httpClient.post<SaveMessageScheduleResponse>(`${environment.baseURL}${environment.UPDATE_MESSAGE_SCHEDULE_SERVICE}`, request)
  }

  getMessageScheduleList(request: GetListCommonRequest): Observable<GetMessageScheduleListResponse> {
    return this.httpClient.post<GetMessageScheduleListResponse>(`${environment.baseURL}${environment.GET_MESSAGE_SCHEDULE_LIST}`, request)
  }

  getMessageScheduleByOid(request: GetByOidCommonRequest): Observable<GetMessageScheduleByOidResponse> {
    return this.httpClient.post<GetMessageScheduleByOidResponse>(`${environment.baseURL}${environment.GET_MESSAGE_SCHEDULE_BY_OID}`, request)
  }


  // MESSAGE JOB

  getMessageJobList(request: GetListCommonRequest): Observable<GetMessageJobListResponse> {
    return this.httpClient.post<GetMessageJobListResponse>(`${environment.baseURL}${environment.GET_MESSAGE_JOB_LIST}`, request)
  }

  getMessageJobByOid(request: GetByOidCommonRequest): Observable<GetMessageJobByOidResponse> {
    return this.httpClient.post<GetMessageJobByOidResponse>(`${environment.baseURL}${environment.GET_MESSAGE_JOB_BY_OID}`, request)
  }


}
