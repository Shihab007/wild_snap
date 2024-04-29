import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSchoolExamResultRoutingModule } from './app-school-exam-result-routing.module';
import { AppSchoolExamResultComponent } from './app-school-exam-result.component';
import { SchoolExamResultListComponent } from './components/school-exam-result-list/school-exam-result-list.component';
import { SchoolExamResultAddComponent } from './components/school-exam-result-add/school-exam-result-add.component';
import { SchoolExamResultViewComponent } from './components/school-exam-result-view/school-exam-result-view.component';
import { SchoolExamResultEditComponent } from './components/school-exam-result-edit/school-exam-result-edit.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MessagesModule } from 'primeng/messages';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolExamResultDetailListComponent } from './components/school-exam-result-detail-list/school-exam-result-detail-list.component';
import { SchoolExamResultDetailViewComponent } from './components/school-exam-result-detail-view/school-exam-result-detail-view.component';


@NgModule({
  declarations: [AppSchoolExamResultComponent, SchoolExamResultListComponent, SchoolExamResultAddComponent, SchoolExamResultViewComponent, SchoolExamResultEditComponent, SchoolExamResultDetailListComponent, SchoolExamResultDetailViewComponent],
  imports: [
    CommonModule,
    AppSchoolExamResultRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
    FullCalendarModule,
    FormsModule,
    TranslateModule,
  ]
})
export class AppSchoolExamResultModule { }
