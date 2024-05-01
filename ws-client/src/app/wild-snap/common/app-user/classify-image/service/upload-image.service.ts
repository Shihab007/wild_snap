
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageUploadResponse } from './imageUploadResponse';
import { ClassifyImageAddResponse } from '../model/response/classify-image-add-response';
import { ClassifyImageAddRequest } from '../model/request/classify-image-add-request';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private httpClient: HttpClient) { }

  uploadImage(formData: FormData): Observable<ImageUploadResponse>{
    return this.httpClient.post<ImageUploadResponse>(`${environment.baseURL}${environment.uploadImage}`, formData);
  }


  saveClassifyImage(request: ClassifyImageAddRequest): Observable<ClassifyImageAddResponse> {
    return this.httpClient.post<ClassifyImageAddResponse>(`${environment.baseURL}${environment.classifyImageAdd}`, request);
  }

}
