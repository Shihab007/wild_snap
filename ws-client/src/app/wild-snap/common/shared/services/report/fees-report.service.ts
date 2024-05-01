import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeesReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolDueFeesReportByInstituteClassReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_DUE_FEES_REPORT_BY_INSTITUTE_CLASS
      }`, request, {
      responseType: 'blob',
    })
  }

  getSchoolFeesCollectionByInstituteClassReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_FEES_COLLECTION_REPORT_BY_INSTITUTE_CLASS
      }`, request, {
      responseType: 'blob',
    })
  }

  getSchoolFeesCollectionDetailsByInstituteClassReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_FEES_COLLECTION_DETAIL_REPORT_BY_INSTITUTE_CLASS
      }`, request, {
      responseType: 'blob',
    })
  }

  getSchoolDueFeesHistoryByInstituteClassReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_DUE_FEES_HISTORY_REPORT_BY_INSTITUTE_CLASS
      }`, request, {
      responseType: 'blob',
    })
  }

  getSchoolDueFeesByStudentIdReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_DUE_FEES_REPORT_BY_STUDENT_ID
      }`, request, {
      responseType: 'blob',
    })
  }

  getSchoolFeesColloctionByStudentIdByStudentIdReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_FEES_COLLECTION_REPORT_BY_STUDENT_ID
      }`, request, {
      responseType: 'blob',
    })
  }
}
