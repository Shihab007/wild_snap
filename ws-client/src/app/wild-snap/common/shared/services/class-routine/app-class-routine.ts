import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassRoutineResponse } from '../../response/class-routine/class-routine-response';
import { environment } from 'src/environments/environment';
import { ClassRoutineListRequest } from '../../request/class-routine/class-routine-list-request';
import { ClassRoutineListResponse } from '../../response/class-routine/class-routine-list-response';


@Injectable({
    providedIn: 'root'
})
export class AppClassRoutineListService {

    constructor(private httpClient: HttpClient) { }

    getClassRoutineList(request: ClassRoutineListRequest): Observable<ClassRoutineListResponse> {
        return this.httpClient.post<ClassRoutineListResponse>(`${environment.baseURL}${environment.GET_CLASS_PERIOD_LIST}`, request)
    }


}
