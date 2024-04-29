import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllSectionByParticularClassSectionRequest } from '../../request/admission/all-section-by-particular-class-section-request';
import { AllSectionByParticularClassSectionResponse } from '../../response/admission/all-section-by-particular-class-section-response';

@Injectable({
  providedIn: 'root'
})
export class AllSectionByParticularClassSectionService {

  constructor(private httpClient: HttpClient) { }


  

}
