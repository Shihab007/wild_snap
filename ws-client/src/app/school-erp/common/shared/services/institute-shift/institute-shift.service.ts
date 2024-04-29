import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddClassRequest } from '../../request/class/add-class-request';
import { GetClassByOidRequest } from '../../request/class/get-class-by-oid-request';
import { AddClassResponse } from '../../response/class/add-class-response';
import { GetClassByOidResponse } from '../../response/class/get-class-by-oid-response';
import { InstituteShiftModelRequest } from '../../response/shift/institute-shift-model-request';
import { InstituteShiftModelResponse } from '../../response/shift/institute-shift-model-response';
import { InstituteShiftListResponse } from '../../response/shift/institute-shift-response';

@Injectable({
  providedIn: 'root'
})
export class InstituteShiftService {

  constructor(private httpClient: HttpClient) { }




  saveShift(request: InstituteShiftModelRequest): Observable<AddClassResponse> {
    return this.httpClient.post<AddClassResponse>(`${environment.baseURL}${environment.CREATE_INSTITUTE_SHIFT
      }`, request)
  }

  updateShift(request: InstituteShiftModelRequest): Observable<InstituteShiftModelResponse> {
    return this.httpClient.post<InstituteShiftModelResponse>(`${environment.baseURL}${environment.UPDATE_INSTITUTE_SHIFT
      }`, request)
  }

}
