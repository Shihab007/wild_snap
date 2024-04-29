import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSmsServiceRoutingModule } from './admin-sms-service-routing.module';
import { AdminSmsServiceComponent } from './admin-sms-service.component';
import { AdminSmsServiceListComponent } from './components/admin-sms-service-list/admin-sms-service-list.component';
import { AdminSmsServiceViewComponent } from './components/admin-sms-service-view/admin-sms-service-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { SwitchModule } from 'src/app/shared/switch/switch.module';
import { AdminInstituteSmsServiceListComponent } from './components/admin-institute-sms-service-list/admin-institute-sms-service-list.component';
import { AdminInstituteSmsServiceLogListComponent } from './components/admin-institute-sms-service-log-list/admin-institute-sms-service-log-list.component';


@NgModule({
  declarations: [AdminSmsServiceComponent, AdminSmsServiceListComponent, AdminSmsServiceViewComponent, AdminInstituteSmsServiceListComponent, AdminInstituteSmsServiceLogListComponent],
  imports: [
    CommonModule,
    AdminSmsServiceRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    SwitchModule
  ],
  exports: [
    AdminInstituteSmsServiceListComponent
  ]
})
export class AdminSmsServiceModule { }
