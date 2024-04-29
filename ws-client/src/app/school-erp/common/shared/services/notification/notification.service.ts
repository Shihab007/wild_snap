import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SmsContactNotificationRequest } from '../../request/notification/sms-contact-notification-request';
import { SmsContactNotificationResponse } from '../../response/notification/sms-contact-notification-response';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  sendSmsNotification(request: SmsContactNotificationRequest): Observable<SmsContactNotificationResponse> {
    return this.httpClient.post<SmsContactNotificationResponse>(`${environment.baseURL}${environment.sms_contact_notification}`, request)
  }
}
