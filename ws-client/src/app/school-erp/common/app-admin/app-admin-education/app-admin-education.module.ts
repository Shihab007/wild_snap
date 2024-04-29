import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminEducationRoutingModule } from './app-admin-education-routing.module';
import { AppAdminEducationComponent } from './app-admin-education.component';


@NgModule({
  declarations: [AppAdminEducationComponent],
  imports: [
    CommonModule,
    AppAdminEducationRoutingModule
  ]
})
export class AppAdminEducationModule { }
