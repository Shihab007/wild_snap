import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetByOidCommonRequest } from '../../request/common/get-by-oid-common-request';
import { ApproveSmsServiceRequest } from '../../request/sms/approve-sms-service-request';
import { GetSmsServiceByOidRequest } from '../../request/sms/get-sms-service-by-oid-request';
import { GetSmsServiceListRequest } from '../../request/sms/get-sms-service-list-request';
import { GetSmsServiceLogListRequest } from '../../request/sms/get-sms-service-log-list-request';
import { RejectSmsServiceRequest } from '../../request/sms/reject-sms-service-request';
import { SaveSmsServiceLogRequest } from '../../request/sms/save-sms-service-log-request';
import { SaveSmsServiceRequest } from '../../request/sms/save-sms-service-request';
import { SmsServiceRequest } from '../../request/sms/sms-service-request';
import { ApproveSmsServiceResponse } from '../../response/sms/approve-sms-service-response';
import { GetInstituteSmsServiceListResponse } from '../../response/sms/get-institute-sms-service-list-response';
import { GetSmsServiceByOidResponse } from '../../response/sms/get-sms-service-by-oid-response';
import { GetSmsServiceListResponse } from '../../response/sms/get-sms-service-list-response';
import { GetSmsServiceLogByOidResponse } from '../../response/sms/get-sms-service-log-by-oid-response';
import { GetSmsServiceLogListResponse } from '../../response/sms/get-sms-service-log-list-response';
import { RejectSmsServiceResponse } from '../../response/sms/reject-sms-service-response';
import { SaveSmsServiceLogResponse } from '../../response/sms/save-sms-service-log-response';
import { SmsServiceResponse } from '../../response/sms/sms-service-response';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private httpClient: HttpClient) { }

  //SMS SERVICE
  getInstituteSmsServiceList(request: GetSmsServiceListRequest): Observable<GetSmsServiceListResponse> {
    return this.httpClient.post<GetSmsServiceListResponse>(`${environment.baseURL}${environment.GET_SMS_SERVICE_LIST}`, request)
  }

  getInstituteSmsServiceInfo(request: GetSmsServiceListRequest): Observable<GetInstituteSmsServiceListResponse> {
    return this.httpClient.post<GetInstituteSmsServiceListResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_SMS_SERVICE_LIST}`, request)
  }
  getSmsServiceByOid(request: GetSmsServiceByOidRequest): Observable<GetSmsServiceByOidResponse> {
    return this.httpClient.post<GetSmsServiceByOidResponse>(`${environment.baseURL}${environment.GET_SMS_SERVICE_BY_OID}`, request)
  }

  updateSmsServiceInfo(request: SmsServiceRequest): Observable<SmsServiceResponse> {
    return this.httpClient.post<SmsServiceResponse>(`${environment.baseURL}${environment.UPDATE_SMS_SERVICE}`, request)
  }

  saveSmsServiceInfo(request: SaveSmsServiceRequest): Observable<SmsServiceResponse> {
    return this.httpClient.post<SmsServiceResponse>(`${environment.baseURL}${environment.SAVE_SMS_SERVICE}`, request)
  }

  approveSmsService(request: ApproveSmsServiceRequest): Observable<ApproveSmsServiceResponse> {
    return this.httpClient.post<ApproveSmsServiceResponse>(`${environment.baseURL}${environment.APPROVE_SMS_SERVICE}`, request)
  }

  rejectSmsService(request: RejectSmsServiceRequest): Observable<RejectSmsServiceResponse> {
    return this.httpClient.post<RejectSmsServiceResponse>(`${environment.baseURL}${environment.REJECT_SMS_SERVICE}`, request)
  }



  //SMS SERVICE LOG
  getSmsServiceLogList(request: GetSmsServiceLogListRequest): Observable<GetSmsServiceLogListResponse> {
    return this.httpClient.post<GetSmsServiceLogListResponse>(`${environment.baseURL}${environment.GET_SMS_SERVICE_LOG_LIST}`, request)
  }

  getSmsServiceLogByOid(request: GetByOidCommonRequest): Observable<GetSmsServiceLogByOidResponse> {
    return this.httpClient.post<GetSmsServiceLogByOidResponse>(`${environment.baseURL}${environment.GET_SMS_SERVICE_LOG_BY_OID}`, request)
  }

  updateSmsServiceLogInfo(request: SaveSmsServiceLogRequest): Observable<SaveSmsServiceLogResponse> {
    return this.httpClient.post<SaveSmsServiceLogResponse>(`${environment.baseURL}${environment.UPDATE_SMS_SERVICE_LOG}`, request)
  }

  saveSmsServiceLogInfo(request: SaveSmsServiceLogRequest): Observable<SaveSmsServiceLogResponse> {
    return this.httpClient.post<SaveSmsServiceLogResponse>(`${environment.baseURL}${environment.SAVE_SMS_SERVICE_LOG}`, request)
  }



}
