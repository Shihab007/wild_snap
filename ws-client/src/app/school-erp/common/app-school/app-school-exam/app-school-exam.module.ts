import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSchoolExamRoutingModule } from './app-school-exam-routing.module';
import { AppSchoolExamComponent } from './app-school-exam.component';
import { SchoolExamListComponent } from './components/school-exam-list/school-exam-list.component';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { LOCALE_ID } from "@angular/core";

import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
const lang = "en-US";
@NgModule({
  declarations: [AppSchoolExamComponent, SchoolExamListComponent],
  imports: [
    CommonModule,
    AppSchoolExamRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgxMaterialTimepickerModule
  ],

  providers: [{ provide: LOCALE_ID, useValue: lang }],
})
export class AppSchoolExamModule { }
