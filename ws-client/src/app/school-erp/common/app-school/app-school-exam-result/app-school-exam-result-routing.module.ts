import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSchoolExamResultComponent } from './app-school-exam-result.component';
import { SchoolExamResultAddComponent } from './components/school-exam-result-add/school-exam-result-add.component';
import { SchoolExamResultDetailListComponent } from './components/school-exam-result-detail-list/school-exam-result-detail-list.component';
import { SchoolExamResultDetailViewComponent } from './components/school-exam-result-detail-view/school-exam-result-detail-view.component';
import { SchoolExamResultEditComponent } from './components/school-exam-result-edit/school-exam-result-edit.component';
import { SchoolExamResultListComponent } from './components/school-exam-result-list/school-exam-result-list.component';
import { SchoolExamResultViewComponent } from './components/school-exam-result-view/school-exam-result-view.component';

const routes: Routes = [
  {
    path: '',
    component: AppSchoolExamResultComponent,
    children: [
      {
        path: 'add',
        component: SchoolExamResultAddComponent,
        //data: { title: extract('Add Exam Result') },
      },
      {
        path: 'list',
        component: SchoolExamResultListComponent,
        //data: { title: extract('Exam Result List') },
      },
      {
        path: 'detail-list',
        component: SchoolExamResultDetailListComponent,
        //data: { title: extract('Exam Result List') },
      },
      {
        path: 'view/:oid',
        component: SchoolExamResultViewComponent,
        //data: { title: extract('Exam Result List') },
      },
      {
        path: 'detail-view/:oid',
        component: SchoolExamResultDetailViewComponent,
        //data: { title: extract('Exam Result List') },
      },
      {
        path: 'edit/:oid',
        component: SchoolExamResultEditComponent,
        //data: { title: extract('Exam Result List') },
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchoolExamResultRoutingModule { }
