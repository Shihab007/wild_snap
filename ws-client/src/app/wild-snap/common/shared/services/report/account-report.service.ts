import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountReportService {

  constructor(private httpClient: HttpClient) { }

  getSchoolAccountPayableReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ACCOUNT_PAYABLE_REPORT}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolAccountPayableExcelSheetReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ACCOUNT_PAYABLE_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolAccountReceivableReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ACCOUNT_RECEIVABLE_REPORT}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolAccountReceivableExcelSheetReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ACCOUNT_RECEIVABLE_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolAdvancePaymentReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ADVANCE_PAYMENT_REPORT}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolAdvancePaymentExcelSheetReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ADVANCE_PAYMENT_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolAdvanceReceivedReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ADVANCE_RECEIVED_REPORT}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolAdvanceReceivedExcelSheetReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_ADVANCE_RECEIVED_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolSalaryPayableReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_SALARY_PAYABLE_REPORT}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolSalaryPayableExcelSheetReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_SALARY_PAYABLE_LIST_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolBalanceSheetReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_BALANCE_SHEET_REPORT}`, request, {
      responseType: 'blob',
    })
  }
  getSchoolBalanceSheetExcelSheetReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_BALANCE_SHEET_EXCEL_SHEET}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolLedgerBalanceReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_LEDGER_BALANCE_REPORT}`, request, {
      responseType: 'blob',
    })
  }

  getSchoolJournalSummaryReport(request: any): Observable<Blob> {
    return this.httpClient.post(`${environment.baseURL}${environment.GET_JOURNAL_SUMMARY_REPORT}`, request, {
      responseType: 'blob',
    })
  }
}
