import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminExamComponent } from '../app-admin-exam/app-admin-exam.component';
import { AdminExamResultAddComponent } from './component/admin-exam-result-add/admin-exam-result-add.component';
import { AdminExamResultListComponent } from './component/admin-exam-result-list/admin-exam-result-list.component';

const routes: Routes = [
  {
    path:'',
    component: AppAdminExamComponent,
    children: [
      {
        path:'add',
        component: AdminExamResultAddComponent
      },
      {
        path:'list',
        component: AdminExamResultListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminExamResultRoutingModule { }
