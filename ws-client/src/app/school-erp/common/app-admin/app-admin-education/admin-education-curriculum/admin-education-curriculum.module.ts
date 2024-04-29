import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationCurriculumRoutingModule } from './admin-education-curriculum-routing.module';
import { AdminEducationCurriculumComponent } from './admin-education-curriculum.component';
import { AdminEducationCurriculumCreateComponent } from './component/admin-education-curriculum-create/admin-education-curriculum-create.component';
import { AdminEducationCurriculumViewComponent } from './component/admin-education-curriculum-view/admin-education-curriculum-view.component';
import { AdminEducationCurriculumUpdateComponent } from './component/admin-education-curriculum-update/admin-education-curriculum-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { AdminEducationCurriculumListComponent } from './component/admin-education-curriculum-list/admin-education-curriculum-list.component';


@NgModule({
  declarations: [AdminEducationCurriculumComponent, AdminEducationCurriculumCreateComponent, AdminEducationCurriculumViewComponent, AdminEducationCurriculumUpdateComponent, AdminEducationCurriculumListComponent],
  imports: [
    CommonModule,
    AdminEducationCurriculumRoutingModule,
    SharedModule,
    CommonLayoutModule,
    FullCalendarModule,
    FormsModule,
    MaterialCustomModule,
    MessagesModule,
  ]
})
export class AdminEducationCurriculumModule { }
