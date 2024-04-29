import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSchoolExamMarkSheetRoutingModule } from './app-school-exam-mark-sheet-routing.module';
import { AppSchoolExamMarkSheetComponent } from './app-school-exam-mark-sheet.component';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    AppSchoolExamMarkSheetComponent
  ],
  imports: [
    CommonModule,
    AppSchoolExamMarkSheetRoutingModule,
    SharedModule,
    CommonLayoutModule
  ]
})
export class AppSchoolExamMarkSheetModule { }
