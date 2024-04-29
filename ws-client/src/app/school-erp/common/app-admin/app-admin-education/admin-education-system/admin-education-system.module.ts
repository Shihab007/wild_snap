import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationSystemRoutingModule } from './admin-education-system-routing.module';
import { AdminEducationSystemComponent } from './admin-education-system.component';
import { AdminEducationSystemListComponent } from './components/admin-education-system-list/admin-education-system-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminEducationSystemAddComponent } from './components/admin-education-system-add/admin-education-system-add.component';
import { AdminEducationSystemUpdateComponent } from './components/admin-education-system-update/admin-education-system-update.component';
import { AdminEducationSystemViewComponent } from './components/admin-education-system-view/admin-education-system-view.component';


@NgModule({
  declarations: [AdminEducationSystemComponent, AdminEducationSystemListComponent, AdminEducationSystemAddComponent, AdminEducationSystemUpdateComponent, AdminEducationSystemViewComponent],
  imports: [
    CommonModule,
    AdminEducationSystemRoutingModule,
    SharedModule,
    CommonLayoutModule,
    FullCalendarModule,
    FormsModule,
    MaterialCustomModule,
    MessagesModule,
  ]
})
export class AdminEducationSystemModule { }
