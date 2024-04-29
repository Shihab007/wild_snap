import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminNotificationRoutingModule } from './app-admin-notification-routing.module';
import { AppAdminNotificationComponent } from './app-admin-notification.component';


@NgModule({
  declarations: [AppAdminNotificationComponent],
  imports: [
    CommonModule,
    AppAdminNotificationRoutingModule
  ]
})
export class AppAdminNotificationModule { }
