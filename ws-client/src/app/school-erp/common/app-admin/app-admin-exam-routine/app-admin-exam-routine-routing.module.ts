import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminExamRoutineComponent } from './app-admin-exam-routine.component';
import { AdminExamRoutineAddComponent } from './component/admin-exam-routine-add/admin-exam-routine-add.component';
import { AdminExamRoutineListComponent } from './component/admin-exam-routine-list/admin-exam-routine-list.component';
import { AdminExamRoutineViewComponent } from './component/admin-exam-routine-view/admin-exam-routine-view.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminExamRoutineComponent,
    children: [
      {
        path: 'add',
        component: AdminExamRoutineAddComponent
      },
      {
        path: 'view',
        component: AdminExamRoutineViewComponent
      },
      {
        path: 'list',
        component: AdminExamRoutineListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminExamRoutineRoutingModule { }
