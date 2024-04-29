import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckExistingEducationRequest } from '../../request/textbook/check-existing-education-request';
import { EducationTextbookCreateRequest } from '../../request/textbook/education-textbook-create-request';
import { EducationTextbookListBySessionRequest } from '../../request/textbook/education-textbook-list-by-session-request';
import { TextbookListRequest } from '../../request/textbook/texbook-list-request';
import { CheckExistingEducationTextbookResponse } from '../../response/textbook/check-existing-education-textbook-response';
import { EducationTextbookCreateResponse } from '../../response/textbook/education-textbook-create-response';
import { EducationTextListbookBySessionResponse } from '../../response/textbook/education-textbook-list-by-session-response';
import { TextbookListResponse } from '../../response/textbook/textbook-list-response';

@Injectable({
  providedIn: 'root'
})
export class TextbookService {

  constructor(private httpClient: HttpClient) { }


  educationTextbookCreate(request: EducationTextbookCreateRequest): Observable<EducationTextbookCreateResponse> {
    return this.httpClient.post<EducationTextbookCreateResponse>(`${environment.baseURL}${environment.SAVE_EDUCATION_TEXTBOOK}`, request)
  }

  getTextBookList(request: TextbookListRequest): Observable<TextbookListResponse> {
    return this.httpClient.post<TextbookListResponse>(`${environment.baseURL}${environment.getTextbookList}`, request)
  }

  getEducationTextbookListBySession(request: EducationTextbookListBySessionRequest): Observable<EducationTextListbookBySessionResponse> {
    return this.httpClient.post<EducationTextListbookBySessionResponse>(`${environment.baseURL}${environment.GET_CLASS_TEXT_BOOK_LIST_BY_SESSION}`, request)
  }

  checkExistingEducationTextbook(request: CheckExistingEducationRequest): Observable<CheckExistingEducationTextbookResponse> {
    return this.httpClient.post<CheckExistingEducationTextbookResponse>(`${environment.baseURL}${environment.CHECK_EXISTING_EDUCATION_TEXTBOOK}`, request)
  }

}

