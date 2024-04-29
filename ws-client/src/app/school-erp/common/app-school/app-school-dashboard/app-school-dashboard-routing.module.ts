import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSchoolDashboardComponent } from './app-school-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AppSchoolDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchoolDashboardRoutingModule { }
