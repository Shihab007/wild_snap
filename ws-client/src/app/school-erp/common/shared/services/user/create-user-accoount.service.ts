import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserAccountRequest } from '../../request/user/create-user-account-request';
import { CreateUserAccountResponse } from '../../response/user/create-user-account-response';

@Injectable({
  providedIn: 'root'
})
export class CreateUserAccountService {

  constructor(private httpClient: HttpClient) { }

  //change url before calling
  resetPassword(request: CreateUserAccountRequest): Observable<CreateUserAccountResponse> {
    return this.httpClient.post<CreateUserAccountResponse>(`${environment.baseURL}${environment.createUserAccount}`, request)
  }
}
