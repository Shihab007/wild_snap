import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationSubjectComponent } from './admin-education-subject.component';
import { AdminEducationSubjectListComponent } from './components/admin-education-subject-list/admin-education-subject-list.component';
import { AdminEducationSubjectViewComponent } from './components/admin-education-subject-view/admin-education-subject-view.component';
import { AdminEducationSubjectAddComponent } from './components/admin-education-subject-add/admin-education-subject-add.component';
import { AdminEducationSubjectEditComponent } from './components/admin-education-subject-edit/admin-education-subject-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEducationSubjectComponent,

    children: [
      {
        path: 'list',
        component: AdminEducationSubjectListComponent
      },
      {
        path: 'view',
        component: AdminEducationSubjectViewComponent
      },
      {
        path: 'add',
        component: AdminEducationSubjectAddComponent
      },
      {
        path: 'edit',
        component: AdminEducationSubjectEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationSubjectRoutingModule { }
