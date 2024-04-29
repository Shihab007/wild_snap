import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSmsDashboardComponent } from './admin-sms-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSmsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSmsDashboardRoutingModule { }
