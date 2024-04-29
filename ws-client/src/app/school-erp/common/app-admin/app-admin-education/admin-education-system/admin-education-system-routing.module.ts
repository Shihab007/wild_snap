import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationSystemComponent } from './admin-education-system.component';
import { AdminEducationSystemAddComponent } from './components/admin-education-system-add/admin-education-system-add.component';
import { AdminEducationSystemListComponent } from './components/admin-education-system-list/admin-education-system-list.component';
import { AdminEducationSystemUpdateComponent } from './components/admin-education-system-update/admin-education-system-update.component';
import { AdminEducationSystemViewComponent } from './components/admin-education-system-view/admin-education-system-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEducationSystemComponent,
    children: [
      {
        path: 'list',
        component: AdminEducationSystemListComponent,
        //data: { title: extract('Education System List') },
      },
      {
        path: 'add',
        component: AdminEducationSystemAddComponent,
        //data: { title: extract('Education System List') },
      },
      {
        path: 'view/:oid',
        component: AdminEducationSystemViewComponent,
        //data: { title: extract('Education System List') },
      },
      {
        path: 'edit/:oid',
        component: AdminEducationSystemUpdateComponent,
        //data: { title: extract('Education System List') },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationSystemRoutingModule { }
