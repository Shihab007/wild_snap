import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminExamComponent } from './app-admin-exam.component';
import { AdminExamAddComponent } from './component/admin-exam-add/admin-exam-add.component';
import { AdminExamListComponent } from './component/admin-exam-list/admin-exam-list.component';


const routes: Routes = [
  {
    path: '',
    component: AppAdminExamComponent,
    children: [
      {
        path: 'create',
        component: AdminExamAddComponent
      },
      {
        path: 'list',
        component: AdminExamListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminExamRoutingModule { }
