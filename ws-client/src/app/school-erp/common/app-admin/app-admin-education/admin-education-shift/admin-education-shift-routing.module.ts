import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationShiftComponent } from './admin-education-shift.component';
import { AdminEducationShiftAddComponent } from './components/admin-education-shift-add/admin-education-shift-add.component';
import { AdminEducationShiftEditComponent } from './components/admin-education-shift-edit/admin-education-shift-edit.component';
import { AdminEducationShiftListComponent } from './components/admin-education-shift-list/admin-education-shift-list.component';
import { AdminEducationShiftViewComponent } from './components/admin-education-shift-view/admin-education-shift-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEducationShiftComponent,
    children: [
      {
        path: 'list',
        component: AdminEducationShiftListComponent
      },
      {
        path: 'add',
        component: AdminEducationShiftAddComponent
      },
      {
        path: 'view/:oid',
        component: AdminEducationShiftViewComponent
      },
      {
        path: 'edit',
        component: AdminEducationShiftEditComponent
      },
      {
        path: 'edit/:oid',
        component: AdminEducationShiftEditComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationShiftRoutingModule { }
