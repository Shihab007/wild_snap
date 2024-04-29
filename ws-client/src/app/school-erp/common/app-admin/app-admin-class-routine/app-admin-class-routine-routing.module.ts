import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminClassRoutineComponent } from './app-admin-class-routine.component';
import { AdminClassRoutineAddComponent } from './component/admin-class-routine-add/admin-class-routine-add.component';
import { AdminClassRoutineListComponent } from './component/admin-class-routine-list/admin-class-routine-list.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminClassRoutineComponent,
    children:[
      {
        path: 'add',
        component: AdminClassRoutineAddComponent,
      },
      {
        path: 'list',
        component: AdminClassRoutineListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminClassRoutineRoutingModule { }
