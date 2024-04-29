import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpClient: HttpClient) { }
  
    getUsers(loginRequest: LoginRequest): Observable<LoginResponse> {
      return this.httpClient.post<LoginResponse>(`${environment.baseURL}${environment.userLogin}`, loginRequest);
    }

}
