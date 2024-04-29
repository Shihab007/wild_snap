import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakUserInfoRequest } from '../model/keycloak-user-info/keycloak-user-info-request';
import { KeycloakUserInfoResponse } from '../model/keycloak-user-info/keycloak-user-info-response';


@Injectable({
  providedIn: 'root'
})
export class KeycloakUserInfoService {


  constructor(private httpClient: HttpClient) { }
  
    getUsers(keycloakUserInfoRequest: KeycloakUserInfoRequest): Observable<KeycloakUserInfoResponse> {
      return this.httpClient.post<KeycloakUserInfoResponse>(`${environment.baseURL}${environment.keycloakUserInfo}`, keycloakUserInfoRequest);
    }

}
