import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSchoolInstituteRoutingModule } from './app-school-institute-routing.module';
import { AppSchoolInstituteComponent } from './app-school-institute.component';
import { SchoolInstituteEditComponent } from './components/school-institute-edit/school-institute-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AppSchoolInstituteComponent, SchoolInstituteEditComponent],
  imports: [
    CommonModule,
    AppSchoolInstituteRoutingModule,
    SharedModule
  ]
})
export class AppSchoolInstituteModule { }
