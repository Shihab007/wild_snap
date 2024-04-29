import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSchoolExamMarkSheetComponent } from './app-school-exam-mark-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: AppSchoolExamMarkSheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchoolExamMarkSheetRoutingModule { }
