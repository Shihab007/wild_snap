import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassSettingAddRequest } from '../../request/class-setting/class-setting-add-request';
import { ClassSettingAddResponse } from '../../response/class-setting/class-setting-add-response';
import { GetClassSettingRequest } from '../../request/class-setting/get-class-setting-request';
import { GetClassSettingResponse } from '../../response/class-setting/get-class-setting-response';
import { ClassSettingEditRequest } from '../../request/class-setting/class-setting-edit-request';

@Injectable({
  providedIn: 'root'
})
export class ClassSettingService {

  constructor(private httpClient: HttpClient) { }

  editClassSetting(request: ClassSettingEditRequest): Observable<ClassSettingAddResponse> {
    return this.httpClient.post<ClassSettingAddResponse>(`${environment.baseURL}${environment.UPDATE_INSTITUTE_CLASS_SETTING}`, request)
  }
  addClassSetting(request: ClassSettingAddRequest): Observable<ClassSettingAddResponse> {
    return this.httpClient.post<ClassSettingAddResponse>(`${environment.baseURL}${environment.SAVE_INSTITUTE_CLASS_SETTING}`, request)
  }


  getClassSetting(request: GetClassSettingRequest): Observable<GetClassSettingResponse> {
    return this.httpClient.post<GetClassSettingResponse>(`${environment.baseURL}${environment.GET_INSTITUTE_CLASS_SETTING}`, request)
  }


}
