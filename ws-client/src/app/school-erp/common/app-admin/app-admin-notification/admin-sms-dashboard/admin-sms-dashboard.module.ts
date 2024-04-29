import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSmsDashboardRoutingModule } from './admin-sms-dashboard-routing.module';
import { AdminSmsDashboardComponent } from './admin-sms-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { AdminSmsServiceModule } from '../admin-sms-service/admin-sms-service.module';


@NgModule({
  declarations: [AdminSmsDashboardComponent],
  imports: [
    CommonModule,
    AdminSmsDashboardRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    MaterialCustomModule,
    AdminSmsServiceModule

  ]
})
export class AdminSmsDashboardModule { }
