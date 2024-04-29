import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminInstituteComponent } from './app-admin-institute.component';
import { AdminInstituteCreateComponent } from './componenets/admin-institute-create/admin-institute-create.component';
import { AdminInstituteEditComponent } from './componenets/admin-institute-edit/admin-institute-edit.component';
import { AdminInstituteListComponent } from './componenets/admin-institute-list/admin-institute-list.component';
import { AdminInstituteViewComponent } from './componenets/admin-institute-view/admin-institute-view.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminInstituteComponent,
    children: [
      {
        path: 'add',
        component: AdminInstituteCreateComponent
      },
      {
        path: 'list',
        component: AdminInstituteListComponent,

      },
      {
        path: 'view/:oid',
        component: AdminInstituteViewComponent,
        //data: { title: extract('Exam List') },
      },
      {
        path: 'edit/:oid',
        component: AdminInstituteEditComponent,
        //data: { title: extract('Exam List') },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminInstituteRoutingModule { }
