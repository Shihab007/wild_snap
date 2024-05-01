import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NoticeEditRequest } from '../../request/notice/notice-edit-request';
import { NoticeListRequest } from '../../request/notice/notice-list-request';
import { NoticeRequest } from '../../request/notice/notice-request';
import { NoticeViewRequest } from '../../request/notice/notice-view-request';
import { NoticeEditResponse } from '../../response/notice/notice-edit-response';
import { NoticeListResponse } from '../../response/notice/notice-list-response';
import { NoticeResponse } from '../../response/notice/notice-response';
import { NoticeViewResponse } from '../../response/notice/notice-view-response';
import { ImageUploadResponse } from '../../response/teacher/imageUploadResponse';
import { ApproveNoticeRequest } from '../../request/notice/approve-notice-request';
import { ApproveNoticeResponse } from '../../response/notice/approve-notice-response';
import { RejectNoticeResponse } from '../../response/notice/reject-notice-response';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private httpClient: HttpClient) { }

  saveNotice(request: NoticeRequest): Observable<NoticeResponse> {
    return this.httpClient.post<NoticeResponse>(`${environment.baseURL}${environment.saveNotice}`, request)
  }

  uploadImage(formData: FormData): Observable<ImageUploadResponse> {
    return this.httpClient.post<ImageUploadResponse>(`${environment.baseURL}${environment.uploadImage}`, formData);
  }

  getNoticeList(request: NoticeListRequest): Observable<NoticeListResponse> {
    return this.httpClient.post<NoticeListResponse>(`${environment.baseURL}${environment.getNoticeList}`, request)
  }

  getNoticeView(request: NoticeViewRequest): Observable<NoticeViewResponse> {
    return this.httpClient.post<NoticeViewResponse>(`${environment.baseURL}${environment.getNoticeView}`, request)
  }

  editNotice(request: NoticeEditRequest): Observable<NoticeEditResponse> {
    return this.httpClient.post<NoticeEditResponse>(`${environment.baseURL}${environment.editNotice}`, request)
  }

  approveNotice(request: ApproveNoticeRequest): Observable<ApproveNoticeResponse> {
    return this.httpClient.post<ApproveNoticeResponse>(`${environment.baseURL}${environment.APPROVE_NOTICE}`, request)
  }

  rejectNotice(request: ApproveNoticeRequest): Observable<RejectNoticeResponse> {
    return this.httpClient.post<RejectNoticeResponse>(`${environment.baseURL}${environment.REJECT_NOTICE}`, request)
  }

}
