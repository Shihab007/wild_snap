import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddNewTeacherRequest } from '../../request/teacher/add-new-teacher-request';
import { AddNewTeacherResponse } from '../../response/teacher/add-new-teacher-response';
import { ImageUploadResponse } from '../../response/teacher/imageUploadResponse';

@Injectable({
  providedIn: 'root'
})
export class AddNewTeacherService {

  constructor(private httpClient: HttpClient) { }

  addNewTeacher(request: AddNewTeacherRequest): Observable<AddNewTeacherResponse> {
    return this.httpClient.post<AddNewTeacherResponse>(`${environment.baseURL}${environment.addNewTeacher}`, request);
  }

  uploadImage(formData: FormData): Observable<ImageUploadResponse>{
    return this.httpClient.post<ImageUploadResponse>(`${environment.baseURL}${environment.uploadImage}`, formData);
  }

}
