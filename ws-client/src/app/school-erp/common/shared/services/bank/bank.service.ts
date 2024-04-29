import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetBankAccountByOidRequest } from '../../request/asset/bank-account/get-bank-account-by-oid-request';
import { GetBankAccountListRequest } from '../../request/asset/bank-account/get-bank-account-list-request';
import { SaveBankAccountRequest } from '../../request/asset/bank-account/save-bank-account-request';
import { GetBankTransactionListRequest } from '../../request/asset/bank-account/get-bank-transaction-list-request';
import { UpdateBankAccountRequest } from '../../request/asset/bank-account/update-bank-account-request';
import { GetBankAccountByOidResponse } from '../../response/asset/bank-account/get-bank-account-by-oid-response';
import { GetBankAccountListResponse } from '../../response/asset/bank-account/get-bank-account-list-response';
import { SaveBankAccountResponse } from '../../response/asset/bank-account/save-bank-account-response';
import { GetBankTransactionListResponse } from '../../response/asset/bank-account/get-bank-transaction-list-response';
import { UpdateBankAccountResponse } from '../../response/asset/bank-account/update-bank-account-response';
import { SaveBankTransactionRequest } from '../../request/asset/bank-account/save-bank-transaction-request';
import { SaveBankTransactionResponse } from '../../response/asset/bank-account/save-bank-transaction-response';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private httpClient: HttpClient) { }
  getBankAccountList(getBankAccountListRequest: GetBankAccountListRequest): Observable<GetBankAccountListResponse> {
    return this.httpClient.post<GetBankAccountListResponse>(
      `${environment.baseURL}${environment.GET_BANK_ACCOUNT_LIST}`, getBankAccountListRequest);
  }

  getBankAccountByOid(getBankAccountByOidRequest: GetBankAccountByOidRequest): Observable<GetBankAccountByOidResponse> {
    return this.httpClient.post<GetBankAccountByOidResponse>(
      `${environment.baseURL}${environment.GET_BANK_ACCOUNT_BY_OID}`, getBankAccountByOidRequest);
  }

  saveBankAccount(saveBankAccountRequest: SaveBankAccountRequest): Observable<SaveBankAccountResponse> {
    return this.httpClient.post<SaveBankAccountResponse>(
      `${environment.baseURL}${environment.SAVE_BANK_ACCOUNT}`, saveBankAccountRequest);
  }

  updateBankAccount(updateBankAccountRequest: UpdateBankAccountRequest): Observable<UpdateBankAccountResponse> {
    return this.httpClient.post<UpdateBankAccountResponse>(
      `${environment.baseURL}${environment.UPDATE_BANK_ACCOUNT}`, updateBankAccountRequest);
  }

  getBankTransactionList(getBankTransactionListRequest: GetBankTransactionListRequest): Observable<GetBankTransactionListResponse> {
    return this.httpClient.post<GetBankTransactionListResponse>(
      `${environment.baseURL}${environment.GET_BANK_TRANSACTION_LIST}`, getBankTransactionListRequest);
  }

  saveBankTransaction(saveBankTransactionListRequest: SaveBankTransactionRequest): Observable<SaveBankTransactionResponse> {
    return this.httpClient.post<SaveBankTransactionResponse>(
      `${environment.baseURL}${environment.SAVE_BANK_TRANSACTION}`, saveBankTransactionListRequest);
  }
}
