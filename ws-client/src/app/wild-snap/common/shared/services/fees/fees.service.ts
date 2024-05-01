import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRepeatedFeesRequest } from '../../request/fees/due-fees/create-repeated-fees-request';
import { CreateFeesCollectionWithDetailsRequest } from '../../request/fees/fees-collection/create-fees-collection-with-details-request';
import { GetFeesCollectionDetailByStudentRequest } from '../../request/fees/fees-collection/get-fees-collection-detail-by-student-request';
import { GetFeesCollectionListRequest } from '../../request/fees/fees-collection/get-fees-collection-list-request';
import { FeesCommonRequest } from '../../request/fees/fees-common-request';
import { GetDueFeesDetailsByStudentRequest } from '../../request/fees/get-due-fees-details-by-student-request';
import { GetPaymentModeListRequest } from '../../request/fees/payment-mode/get-payment-mode-list-request';
import { CreateRepeatedFeesResponse } from '../../response/fees/due-fees/create-repeated-fees-response';
import { GetDueFeesByInstituteAndClassResponse } from '../../response/fees/due-fees/get-due-fees-by-institute-and-class-response';
import { GetDueFeesHistoryByInstituteAndClassResponse } from '../../response/fees/due-fees/get-due-fees-history-by-institute-and-class-response';
import { CreateFeesCollectionWithDetailsResponse } from '../../response/fees/fees-collection/create-fees-collection-with-details-response';
import { GetFeesCollecgionListResponse } from '../../response/fees/fees-collection/get-fees-collecgion-list-response';
import { GetFeesCollectionByInstituteAndClassResponse } from '../../response/fees/fees-collection/get-fees-collection-by-institute-and-class-response';
import { GetFeesCollectionDetailByStudentResponse } from '../../response/fees/fees-collection/get-fees-collection-detail-by-student-response';
import { GetFeesCollectionHistoryByInstituteAndClassResponse } from '../../response/fees/fees-collection/get-fees-collection-history-by-institute-and-class-response';
import { GetDueFeesDetailsByStudentResponse } from '../../response/fees/get-due-fees-details-by-student-response';
import { GetPaymentModeResponse } from '../../response/fees/payment-mode/get-payment-mode-response';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  constructor(private httpClient: HttpClient) { }

  getDueFeesByInstituteAndClass(request: FeesCommonRequest): Observable<GetDueFeesByInstituteAndClassResponse> {
    return this.httpClient.post<GetDueFeesByInstituteAndClassResponse>(`${environment.baseURL}${environment.INSTITUTE_CLASS_WISE_GET_DUE_FEES}`, request)
  }


  getDueFeesHistoryByInstituteAndClass(request: FeesCommonRequest): Observable<GetDueFeesHistoryByInstituteAndClassResponse> {
    return this.httpClient.post<GetDueFeesHistoryByInstituteAndClassResponse>(`${environment.baseURL}${environment.INSTITUTE_CLASS_WISE_GET_DUE_FEES_HISTORY}`, request)
  }


  getFeesCollectionByInstituteAndClass(request: FeesCommonRequest): Observable<GetFeesCollectionByInstituteAndClassResponse> {
    return this.httpClient.post<GetFeesCollectionByInstituteAndClassResponse>(`${environment.baseURL}${environment.INSTITUTE_CLASS_WISE_GET_FEES_COLLECTION}`, request)
  }


  getFeesCollectionHistoryByInstituteAndClass(request: FeesCommonRequest): Observable<GetFeesCollectionHistoryByInstituteAndClassResponse> {
    return this.httpClient.post<GetFeesCollectionHistoryByInstituteAndClassResponse>(`${environment.baseURL}${environment.INSTITUTE_CLASS_WISE_GET_FEES_COLLECTION_DETAIL}`, request)
  }

  getDueFeesDetailsByStudent(request: GetDueFeesDetailsByStudentRequest): Observable<GetDueFeesDetailsByStudentResponse> {
    return this.httpClient.post<GetDueFeesDetailsByStudentResponse>(`${environment.baseURL}${environment.GET_DUE_FEES_DETAIL_BY_STUDENT}`, request)
  }



  getDueFeesDetailsByApplicationTrackingId(request: GetDueFeesDetailsByStudentRequest): Observable<GetDueFeesDetailsByStudentResponse> {
    return this.httpClient.post<GetDueFeesDetailsByStudentResponse>(`${environment.baseURL}${environment.GET_DUE_FEES_DETAIL_BY_APPLICATION_TRACKING_ID}`, request)
  }

  getFeesCollectionList(request: GetFeesCollectionListRequest): Observable<GetFeesCollecgionListResponse> {
    return this.httpClient.post<GetFeesCollecgionListResponse>(`${environment.baseURL}${environment.GET_FEES_COLLECTION_LIST}`, request)
  }

  createFeesCollectionWithDetails(request: CreateFeesCollectionWithDetailsRequest): Observable<CreateFeesCollectionWithDetailsResponse> {
    return this.httpClient.post<CreateFeesCollectionWithDetailsResponse>(`${environment.baseURL}${environment.CREATE_FEES_COLLECTION_WITH_DETAIL}`, request)
  }

  getgetPaymentMode(request: GetPaymentModeListRequest): Observable<GetPaymentModeResponse> {
    return this.httpClient.post<GetPaymentModeResponse>(`${environment.baseURL}${environment.GET_PAYMENT_MODE_LIST}`, request)
  }

  createRepeatedFees(request: CreateRepeatedFeesRequest): Observable<CreateRepeatedFeesResponse> {
    return this.httpClient.post<CreateRepeatedFeesResponse>(`${environment.baseURL}${environment.CREATE_REPEATED_FEES}`, request)
  }

  getFeesCollectionDetailByStudent(request: GetFeesCollectionDetailByStudentRequest): Observable<GetFeesCollectionDetailByStudentResponse> {
    return this.httpClient.post<GetFeesCollectionDetailByStudentResponse>(`${environment.baseURL}${environment.GET_FEES_COLLECTION_DETAIL_BY_STUDENT}`, request)
  }


}
