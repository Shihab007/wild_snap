import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationCurriculumComponent } from './admin-education-curriculum.component';
import { AdminEducationCurriculumCreateComponent } from './component/admin-education-curriculum-create/admin-education-curriculum-create.component';
import { AdminEducationCurriculumListComponent } from './component/admin-education-curriculum-list/admin-education-curriculum-list.component';
import { AdminEducationCurriculumUpdateComponent } from './component/admin-education-curriculum-update/admin-education-curriculum-update.component';
import { AdminEducationCurriculumViewComponent } from './component/admin-education-curriculum-view/admin-education-curriculum-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEducationCurriculumComponent,
    children: [
      {
        path: 'list',
        component: AdminEducationCurriculumListComponent,
        //data: { title: extract('Education Board List') },
      },
      {
        path: 'add',
        component: AdminEducationCurriculumCreateComponent,
        //data: { title: extract('Education Board List') },
      },
      {
        path: 'edit/:oid',
        component: AdminEducationCurriculumUpdateComponent,
        //data: { title: extract('Education Board List') },
      }, {
        path: 'view/:oid',
        component: AdminEducationCurriculumViewComponent,
        //data: { title: extract('Education Board List') },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationCurriculumRoutingModule { }
