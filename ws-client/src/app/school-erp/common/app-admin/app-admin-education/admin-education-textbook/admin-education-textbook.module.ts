import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationTextbookRoutingModule } from './admin-education-textbook-routing.module';
import { AdminEducationTextbookComponent } from './admin-education-textbook.component';
import { AdminEducationTextbookListComponent } from './components/admin-education-textbook-list/admin-education-textbook-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminEducationTextbookCreateComponent } from './components/admin-education-textbook-create/admin-education-textbook-create.component';


@NgModule({
  declarations: [AdminEducationTextbookComponent, AdminEducationTextbookListComponent, AdminEducationTextbookCreateComponent],
  imports: [
    CommonModule,
    AdminEducationTextbookRoutingModule,
    SharedModule
  ]
})
export class AdminEducationTextbookModule { }
