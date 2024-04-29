import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FileUploadResponse } from "../response/fileUploadResponse";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadImage(formData: FormData): Observable<FileUploadResponse> {
    return this.httpClient.post<FileUploadResponse>(`${environment.baseURL}${environment.uploadImage}`, formData);
  }

}
