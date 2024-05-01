import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonChangePasswordComponent } from 'src/app/shared/common-change-password/common-change-password.component';
import { AppAdminProfileComponent } from './app-admin-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminProfileComponent
  },
  {
    path: 'admin-view',
    component: AppAdminProfileComponent
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
export class AppAdminProfileRoutingModule { }
