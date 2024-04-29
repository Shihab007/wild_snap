import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSchoolExamComponent } from './app-school-exam.component';
import { SchoolExamListComponent } from './components/school-exam-list/school-exam-list.component';

const routes: Routes = [
  {
    path: '',
    component: AppSchoolExamComponent,
    children: [

      {
        path: 'portal',
        component: SchoolExamListComponent,
        //data: { title: extract('Exam List') },
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchoolExamRoutingModule { }
