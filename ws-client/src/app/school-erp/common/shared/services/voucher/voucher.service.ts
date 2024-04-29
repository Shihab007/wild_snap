import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { GetVoucherPaymentListByGuardianIdRequest } from '../../request/voucher-payment/get-voucher-payment-list-by-guardian-id-request';
import { CheckVoucherStudentListByFeeRequest } from '../../request/voucher/check-voucher-student-list-by-fee-request';
import { GetVoucherByOidRequest } from '../../request/voucher/get-voucher-by-oid-request';
import { GetVoucherListByGuardianIdRequest } from '../../request/voucher/get-voucher-list-by-guardian-id-request';
import { SaveVoucherRequest } from '../../request/voucher/save-voucher-request';
import { TeacherVoucherListRequest } from '../../request/voucher/teacher-voucher-list-request';
import { UpdateVoucherRequest } from '../../request/voucher/update-voucher-request';
import { VoucherListRequest } from '../../request/voucher/voucher-list-request';
import { CommonSaveOrUpdateResponse } from '../../response/common/common-save-or-update-response';
import { CheckVoucherStudentByFeeResponse } from '../../response/voucher/check-voucher-student-by-fee-response';
import { CheckVoucherStudentListByFeeResponse } from '../../response/voucher/check-voucher-student-list-by-fee-response';
import { GetVoucherByOidResponse } from '../../response/voucher/get-voucher-by-oid-response';
import { GetVoucherListByGuardianIdResponse } from '../../response/voucher/get-voucher-list-by-guardian-id-response';
import { SaveVoucherResponse } from '../../response/voucher/save-voucher-response';
import { TeacherVoucherListResponse } from '../../response/voucher/teacher-voucher-list-response';
import { VoucherListResponse } from '../../response/voucher/voucher-list-response';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private httpClient: HttpClient) { }

  updateVoucher(request: UpdateVoucherRequest): Observable<CommonSaveOrUpdateResponse> {
    return this.httpClient.post<CommonSaveOrUpdateResponse>(
      `${environment.baseURL}${environment.UPDATE_VOUCHER}`, request);
  }

  getVoucherList(request: VoucherListRequest): Observable<VoucherListResponse> {
    return this.httpClient.post<VoucherListResponse>(
      `${environment.baseURL}${environment.GET_VOUCHER_LIST}`, request);
  }

  getVoucherByOid(request: GetVoucherByOidRequest): Observable<GetVoucherByOidResponse> {
    return this.httpClient.post<GetVoucherByOidResponse>(
      `${environment.baseURL}${environment.GET_VOUCHER_BY_OID}`, request);
  }

  checkVoucherStudentListByFee(request: CheckVoucherStudentListByFeeRequest): Observable<CheckVoucherStudentListByFeeResponse> {
    return this.httpClient.post<CheckVoucherStudentListByFeeResponse>(
      `${environment.baseURL}${environment.CHECK_VOUCHER_STUDENT_LIST_BY_FEE}`, request);
  }


  checkVoucherStudentByFee(request: CheckVoucherStudentListByFeeRequest): Observable<CheckVoucherStudentByFeeResponse> {
    return this.httpClient.post<CheckVoucherStudentByFeeResponse>(
      `${environment.baseURL}${environment.CHECK_STUDENT_VOUCHER_BY_FEE}`, request);
  }

  saveVoucher(request: SaveVoucherRequest): Observable<SaveVoucherResponse> {
    return this.httpClient.post<SaveVoucherResponse>(
      `${environment.baseURL}${environment.SAVE_VOUCHER}`, request);
  }

  getVoucherListByGuardianId(request: GetVoucherPaymentListByGuardianIdRequest): Observable<GetVoucherListByGuardianIdResponse> {
    return this.httpClient.post<GetVoucherListByGuardianIdResponse>(
      `${environment.baseURL}${environment.GET_VOUCHER_LIST_BY_GUARDIAN_ID}`, request);
  }

  getTeacherVoucherList(request: TeacherVoucherListRequest): Observable<TeacherVoucherListResponse> {
    return this.httpClient.post<TeacherVoucherListResponse>(
      `${environment.baseURL}${environment.GET_VOUCHER_LIST}`, request);
  }
}
