import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationSubjectRoutingModule } from './admin-education-subject-routing.module';
import { AdminEducationSubjectComponent } from './admin-education-subject.component';
import { AdminEducationSubjectListComponent } from './components/admin-education-subject-list/admin-education-subject-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { AdminEducationSubjectViewComponent } from './components/admin-education-subject-view/admin-education-subject-view.component';
import { AdminEducationSubjectAddComponent } from './components/admin-education-subject-add/admin-education-subject-add.component';
import { AdminEducationSubjectEditComponent } from './components/admin-education-subject-edit/admin-education-subject-edit.component';
import { MessagesModule } from 'primeng/messages';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SwitchModule } from 'src/app/shared/switch/switch.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [AdminEducationSubjectComponent, AdminEducationSubjectListComponent, AdminEducationSubjectViewComponent, AdminEducationSubjectAddComponent, AdminEducationSubjectEditComponent],
  imports: [
    CommonModule,
    AdminEducationSubjectRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
    FullCalendarModule,
    FormsModule,
    TranslateModule,
    SwitchModule,
    NgSelectModule
  ]
})
export class AdminEducationSubjectModule { }
