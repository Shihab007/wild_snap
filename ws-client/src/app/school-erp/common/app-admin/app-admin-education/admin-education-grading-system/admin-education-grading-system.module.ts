import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationGradingSystemRoutingModule } from './admin-education-grading-system-routing.module';
import { AdminEducationGradingSystemComponent } from './admin-education-grading-system.component';
import { AdminEducationGradingSystemListComponent } from './components/admin-education-grading-system-list/admin-education-grading-system-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [AdminEducationGradingSystemComponent, AdminEducationGradingSystemListComponent],
  imports: [
    CommonModule,
    AdminEducationGradingSystemRoutingModule,
    SharedModule,
    CommonLayoutModule,
    FullCalendarModule,
    FormsModule,
    MaterialCustomModule,
    MessagesModule,
  ]
})
export class AdminEducationGradingSystemModule { }
