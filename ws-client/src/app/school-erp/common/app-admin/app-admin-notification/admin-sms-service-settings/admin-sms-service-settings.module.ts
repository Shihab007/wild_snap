import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSmsServiceSettingsRoutingModule } from './admin-sms-service-settings-routing.module';
import { AdminSmsServiceSettingsComponent } from './admin-sms-service-settings.component';
import { AdminSmsServiceSettingsListComponent } from './components/admin-sms-service-settings-list/admin-sms-service-settings-list.component';
import { AdminSmsServiceSettingsViewComponent } from './components/admin-sms-service-settings-view/admin-sms-service-settings-view.component';
import { AdminSmsServiceSettingsAddComponent } from './components/admin-sms-service-settings-add/admin-sms-service-settings-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { SwitchModule } from 'src/app/shared/switch/switch.module';


@NgModule({
  declarations: [AdminSmsServiceSettingsComponent, AdminSmsServiceSettingsListComponent, AdminSmsServiceSettingsViewComponent, AdminSmsServiceSettingsAddComponent],
  imports: [
    CommonModule,
    AdminSmsServiceSettingsRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    SwitchModule
  ]
})
export class AdminSmsServiceSettingsModule { }
