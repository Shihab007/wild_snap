import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSchoolPasswordComponent } from './app-school-password.component';
import { SchoolPasswordResetComponent } from './components/school-password-reset/school-password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: AppSchoolPasswordComponent,
    children: [
      {
        path: 'reset',
        component: SchoolPasswordResetComponent,
        //data: { title: extract('Add Notice') },
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchoolPasswordRoutingModule { }
