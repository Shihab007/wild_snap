import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminDashboardComponent } from './app-admin-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: AppAdminDashboardComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminDashboardRoutingModule { }
