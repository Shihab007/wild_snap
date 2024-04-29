import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminRoutingModule } from './app-admin-routing.module';
import { AppAdminComponent } from './app-admin.component';
import { HttpBackend } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { AppAdminClassRoomComponent } from './app-admin-class-room/app-admin-class-room.component';
import { AppAdminClassRoutineComponent } from './app-admin-class-routine/app-admin-class-routine.component';
import { AppAdminExamComponent } from './app-admin-exam/app-admin-exam.component';
import { AppAdminExamRoutineComponent } from './app-admin-exam-routine/app-admin-exam-routine.component';
import { AppAdminExamResultComponent } from './app-admin-exam-result/app-admin-exam-result.component';
import { AppAdminClassSubjectComponent } from './app-admin-class-subject/app-admin-class-subject.component';


@NgModule({
  declarations: [AppAdminComponent, AppAdminClassSubjectComponent, AppAdminClassRoomComponent, AppAdminClassRoutineComponent, AppAdminExamComponent, AppAdminExamRoutineComponent, AppAdminExamResultComponent],
  imports: [
    CommonModule,
    AppAdminRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
    FullCalendarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpBackend]
      }
    })
  ]
})
export class AppAdminModule { }
