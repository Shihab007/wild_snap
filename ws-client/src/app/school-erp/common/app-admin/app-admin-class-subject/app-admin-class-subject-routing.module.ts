import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminClassSubjectComponent } from './app-admin-class-subject.component';
import { AdminClassSubjectCreateComponent } from './component/admin-class-subject-create/admin-class-subject-create.component';
import { AdminClassSubjectListComponent } from './component/admin-class-subject-list/admin-class-subject-list.component';
import { AdminClassSubjectUpdateComponent } from './component/admin-class-subject-update/admin-class-subject-update.component';
import { AdminClassSubjectViewComponent } from './component/admin-class-subject-view/admin-class-subject-view.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminClassSubjectComponent,
    children: [
      {
        path: 'add',
        component: AdminClassSubjectCreateComponent
      },
      {
        path: 'list',
        component: AdminClassSubjectListComponent
      },
      {
        path: 'edit/:oid',
        component: AdminClassSubjectUpdateComponent
        //data: { title: extract('Class Section Edit') },
      },
      {
        path: 'view/:oid',
        component: AdminClassSubjectViewComponent
        //data: { title: extract('Class Section Edit') },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminClassSubjectSubjectRoutingModule { }
