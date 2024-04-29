import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSmsFeatureRoutingModule } from './admin-sms-feature-routing.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminSmsFeatureListComponent } from './components/admin-sms-feature-list/admin-sms-feature-list.component';
import { AdminSmsFeatureViewComponent } from './components/admin-sms-feature-view/admin-sms-feature-view.component';
import { AdminSmsFeatureEditComponent } from './components/admin-sms-feature-edit/admin-sms-feature-edit.component';
import { AdminSmsFeatureComponent } from './admin-sms-feature.component';
import { AdminSmsParameterListDialogComponent } from './components/admin-sms-parameter-list-dialog/admin-sms-parameter-list-dialog.component';
@NgModule({
  declarations: [AdminSmsFeatureComponent,
    AdminSmsFeatureListComponent, AdminSmsFeatureViewComponent, AdminSmsFeatureEditComponent, AdminSmsParameterListDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonLayoutModule,
    // FullCalendarModule,
    // FormsModule,
    MaterialCustomModule,
    // MessagesModule,
    AdminSmsFeatureRoutingModule
  ]
})
export class AdminSmsFeatureModule { }
