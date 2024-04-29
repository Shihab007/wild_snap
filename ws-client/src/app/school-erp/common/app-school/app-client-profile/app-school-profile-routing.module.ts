import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonChangePasswordComponent } from 'src/app/shared/common-change-password/common-change-password.component';
import { SchoolProfileEditComponent } from './components/school-profile-edit/school-profile-edit.component';
import { SchoolProfileViewComponent } from './components/school-profile-view/school-profile-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolProfileViewComponent,
  },
  {
    path: 'edit',
    component: SchoolProfileEditComponent,

  },
  {
    path: 'view',
    component: SchoolProfileViewComponent,

  },
  {
    path: 'change-password',
    component: CommonChangePasswordComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchoolProfileRoutingModule { }


