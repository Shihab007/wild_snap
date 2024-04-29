import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateExpenseRequest } from '../../request/expense/create-expense-request';
import { ExpenseListRequest } from '../../request/expense/expense-list-request';
import { GetExpenseRequest } from '../../request/expense/get-expense-request';
import { UpdateExpenseRequest } from '../../request/expense/update-expense-request';
import { CreateExpenseResponse } from '../../response/expense/create-expense-response';
import { ExpenseListResponse } from '../../response/expense/expense-list-response';
import { GetExpenseResponse } from '../../response/expense/get-expense-response';
import { UpdateExpenseResponse } from '../../response/expense/update-expense-response';
import { ApproveExpenseRequest } from '../../request/expense/approve-expense-request';
import { ApproveExpenseResponse } from '../../response/expense/approve-expense-response';
import { RejectExpenseRequest } from '../../request/expense/reject-expense-request';
import { RejectExpenseResponse } from '../../response/expense/reject-expense-response';
import { PaidExpenseRequest } from '../../request/expense/paid-expense-request';
import { PaidExpenseResponse } from '../../response/expense/paid-expense-response';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  constructor(private httpClient: HttpClient) { }


  createExpense(request: CreateExpenseRequest): Observable<CreateExpenseResponse> {
    return this.httpClient.post<CreateExpenseResponse>(`${environment.baseURL}${environment.SAVE_EXPENSE}`, request)
  }

  getExpenseList(request: ExpenseListRequest): Observable<ExpenseListResponse> {
    return this.httpClient.post<ExpenseListResponse>(`${environment.baseURL}${environment.EXPENSE_LIST}`, request)
  }

  getExpense(request: GetExpenseRequest): Observable<GetExpenseResponse> {
    return this.httpClient.post<GetExpenseResponse>(`${environment.baseURL}${environment.GET_EXPENSE}`, request)
  }

  updateExpense(request: UpdateExpenseRequest): Observable<UpdateExpenseResponse> {
    return this.httpClient.post<UpdateExpenseResponse>(`${environment.baseURL}${environment.UPDATE_EXPENSE}`, request)
  }

  approve(request: ApproveExpenseRequest): Observable<ApproveExpenseResponse> {
    return this.httpClient.post<ApproveExpenseResponse>(`${environment.baseURL}${environment.APPROVE_EXPENSE}`, request)
  }

  reject(request: RejectExpenseRequest): Observable<RejectExpenseResponse> {
    return this.httpClient.post<RejectExpenseResponse>(`${environment.baseURL}${environment.REJECT_EXPENSE}`, request)
  }

  paid(request: PaidExpenseRequest): Observable<PaidExpenseResponse> {
    return this.httpClient.post<PaidExpenseResponse>(`${environment.baseURL}${environment.REJECT_EXPENSE}`, request)
  }

}
