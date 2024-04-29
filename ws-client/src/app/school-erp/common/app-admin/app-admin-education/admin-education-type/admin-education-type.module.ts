import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationTypeRoutingModule } from './admin-education-type-routing.module';
import { AdminEducationTypeComponent } from './admin-education-type.component';
import { AdminEducationTypeListComponent } from './components/admin-education-type-list/admin-education-type-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [AdminEducationTypeComponent, AdminEducationTypeListComponent],
  imports: [
    CommonModule,
    AdminEducationTypeRoutingModule,
    SharedModule,
    CommonLayoutModule,
    FullCalendarModule,
    FormsModule,
    MaterialCustomModule,
    MessagesModule,
  ]
})
export class AdminEducationTypeModule { }
