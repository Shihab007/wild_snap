import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminProfileRoutingModule } from './app-admin-profile-routing.module';
import { AppAdminProfileComponent } from './app-admin-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AppAdminProfileComponent],
  imports: [
    CommonModule,
    AppAdminProfileRoutingModule,
    SharedModule
  ]
})
export class AppAdminProfileModule { }
