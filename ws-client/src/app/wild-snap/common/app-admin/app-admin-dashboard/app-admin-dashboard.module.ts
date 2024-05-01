import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminDashboardRoutingModule } from './app-admin-dashboard-routing.module';
import { AppAdminDashboardComponent } from './app-admin-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AppAdminDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppAdminDashboardRoutingModule
  ]
})
export class AppAdminDashboardModule { }
