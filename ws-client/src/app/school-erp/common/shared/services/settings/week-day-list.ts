import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeekDayListRequest } from '../../request/settings/week-day-list-request';
import { WeekDayListResponse } from '../../response/settings/week-day-list-response';


@Injectable({
  providedIn: 'root'
})
export class AppWeekDayListService {

  constructor(private httpClient: HttpClient) { }
  
  getWeekDayList(request:WeekDayListRequest):Observable<WeekDayListResponse>{
    return this.httpClient.post<WeekDayListResponse>(`${environment.baseURL}${environment.weekDayList}`, request)
  }
  
  
}
