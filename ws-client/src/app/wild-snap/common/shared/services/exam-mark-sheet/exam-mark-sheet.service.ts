import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateExamResultMarkSheetRequest } from '../../request/mark-sheet/create-exam-result-mark-sheet-request';
import { CreateFinalExamMarkSheetRequest } from '../../request/mark-sheet/create-final-exam-mark-sheet-request';
import { CreateExamResultMarkSheetResponse } from '../../response/exam-mark-sheet/create-exam-result-mark-sheet-response';
import { CreateFinalExamResultMarkSheetResponse } from '../../response/exam-mark-sheet/create-final-exam-result-mark-sheet-response';

@Injectable({
  providedIn: 'root'
})
export class ExamMarkSheetService {

  constructor(private httpClient: HttpClient) { }

  createExamMarkSheet(request: CreateExamResultMarkSheetRequest): Observable<CreateExamResultMarkSheetResponse> {
    return this.httpClient.post<CreateExamResultMarkSheetResponse>(`${environment.baseURL}${environment.CREATE_EXAM_MARK_SHEET}`, request)
  }

  createFinalExamMarkSheet(request: CreateFinalExamMarkSheetRequest): Observable<CreateFinalExamResultMarkSheetResponse> {
    return this.httpClient.post<CreateFinalExamResultMarkSheetResponse>(`${environment.baseURL}${environment.CREATE_FINAL_EXAM_MARK_SHEET}`, request)
  }


}
