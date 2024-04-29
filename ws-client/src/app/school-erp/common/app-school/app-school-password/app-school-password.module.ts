import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from 'primeng/api';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { AppSchoolPasswordRoutingModule } from './app-school-password-routing.module';
import { AppSchoolPasswordComponent } from './app-school-password.component';
import { SchoolPasswordResetComponent } from './components/school-password-reset/school-password-reset.component';

export function createTranslateLoader(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpBackend), './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppSchoolPasswordComponent, SchoolPasswordResetComponent],
  imports: [
    AppSchoolPasswordRoutingModule,
    CommonModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule
  ]
})
export class AppSchoolPasswordModule { }
