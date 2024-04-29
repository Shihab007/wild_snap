import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';

import { AdminEducationSessionRoutingModule } from './admin-education-session-routing.module';
import { AdminEducationSessionListComponent } from './components/admin-education-session-list/admin-education-session-list.component';
import { AdminEducationSessionComponent } from './admin-education-session.component';
import { AdminEducationSessionViewComponent } from './components/admin-education-session-view/admin-education-session-view.component';
import { AdminEducationSessionEditComponent } from './components/admin-education-session-edit/admin-education-session-edit.component';
import { AdminEducationSessionCloneComponent } from './components/admin-education-session-clone/admin-education-session-clone.component';
import { AdminEducationSessionAddComponent } from './components/admin-education-session-add/admin-education-session-add.component';
import { AdminEducationSessionConfigureComponent } from './components/admin-education-session-configure/admin-education-session-configure.component';



@NgModule({
  declarations: [AdminEducationSessionListComponent, AdminEducationSessionComponent, AdminEducationSessionViewComponent, AdminEducationSessionEditComponent, AdminEducationSessionCloneComponent, AdminEducationSessionAddComponent, AdminEducationSessionConfigureComponent],
  imports: [
    CommonModule,
    AdminEducationSessionRoutingModule,
    SharedModule,
    CommonLayoutModule,
    FullCalendarModule,
    FormsModule,
    MaterialCustomModule,
    MessagesModule,
  ]
})
export class AdminEducationSessionModule { }
