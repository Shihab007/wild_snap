import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationProgramRoutingModule } from './admin-education-program-routing.module';
import { AdminEducationProgramComponent } from './admin-education-program.component';
import { AdminEducationProgramListComponent } from './components/admin-education-program-list/admin-education-program-list.component';


@NgModule({
  declarations: [AdminEducationProgramComponent, AdminEducationProgramListComponent],
  imports: [
    CommonModule,
    AdminEducationProgramRoutingModule
  ]
})
export class AdminEducationProgramModule { }
