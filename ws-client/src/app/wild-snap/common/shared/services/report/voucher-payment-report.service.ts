import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherPaymentReportService {

  constructor(private httpClient: HttpClient) { }

  getVoucherPaymentReport(request: any): Observable<Blob> {

    return this.httpClient.post(`${environment.baseURL}${environment.GET_VOUCHER_PAYMENT_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
