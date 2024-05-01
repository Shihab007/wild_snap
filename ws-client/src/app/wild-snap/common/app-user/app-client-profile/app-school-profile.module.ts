import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSchoolProfileRoutingModule } from './app-school-profile-routing.module';
import { AppSchoolProfileComponent } from './app-school-profile.component';
import { SchoolProfileViewComponent } from './components/school-profile-view/school-profile-view.component';
import { SchoolProfileEditComponent } from './components/school-profile-edit/school-profile-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AppSchoolProfileComponent, SchoolProfileViewComponent, SchoolProfileEditComponent],
  imports: [
    CommonModule,
    AppSchoolProfileRoutingModule,
    SharedModule
  ]
})
export class AppSchoolProfileModule { }
