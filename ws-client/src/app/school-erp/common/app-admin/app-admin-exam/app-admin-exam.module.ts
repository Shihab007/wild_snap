import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminExamRoutingModule } from './app-admin-exam-routing.module';
import { AdminExamAddComponent } from './component/admin-exam-add/admin-exam-add.component';
import { AdminExamListComponent } from './component/admin-exam-list/admin-exam-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const lang = "en-US";


@NgModule({
  declarations: [AdminExamAddComponent, AdminExamListComponent],
  imports: [
    CommonModule,
    AppAdminExamRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
    FullCalendarModule,
    FormsModule,

    NgxMaterialTimepickerModule
  ]
})
export class AppAdminExamModule { }
