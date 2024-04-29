import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { GetVoucherPaymentListByGuardianIdRequest } from '../../request/voucher-payment/get-voucher-payment-list-by-guardian-id-request';
import { PaymentListRequest } from '../../request/voucher-payment/payment-list-request';
import { PaymentViewRequest } from '../../request/voucher-payment/payment-view-request';
import { VoucherPaymentListRequest } from '../../request/voucher-payment/voucher-payment-list-request';
import { GetVoucherPaymentListByGuardianIdResponse } from '../../response/voucher-payment/get-voucher-payment-list-by-guardian-id-response';
import { PaymentListResponse } from '../../response/voucher-payment/payment-list-response';
import { PaymentViewResponse } from '../../response/voucher-payment/payment-view-response';
import { VoucherPaymentListResponse } from '../../response/voucher-payment/voucher-payment-list-response';

@Injectable({
  providedIn: 'root'
})
export class VoucherPaymentService {

  constructor(private httpClient: HttpClient) { }

  payVoucherByStudent(request: VoucherPaymentListRequest): Observable<VoucherPaymentListResponse> {
    return this.httpClient.post<VoucherPaymentListResponse>(
      `${environment.baseURL}${environment.SAVE_VOUCHER_PAYMENT}`, request);
  }

  getVoucherPaymentList(request: PaymentListRequest): Observable<PaymentListResponse> {
    return this.httpClient.post<PaymentListResponse>(
      `${environment.baseURL}${environment.GET_VOUCHER_PAYMENT_LIST}`, request);
  }

  getVoucherPaymentDetails(request: PaymentViewRequest): Observable<PaymentViewResponse> {
    return this.httpClient.post<PaymentViewResponse>(
      `${environment.baseURL}${environment.GET_VOUCHER_PAYMENT_BY_OID}`, request);
  }

  getVoucherPaymentListByGuardianId(request: GetVoucherPaymentListByGuardianIdRequest): Observable<GetVoucherPaymentListByGuardianIdResponse> {
    return this.httpClient.post<GetVoucherPaymentListByGuardianIdResponse>(
      `${environment.baseURL}${environment.GET_VOUCHER_PAYMENT_LIST_BY_GUARDIAN_ID}`, request);
  }
}
