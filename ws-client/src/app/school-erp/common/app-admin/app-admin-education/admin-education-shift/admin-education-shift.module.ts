import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationShiftRoutingModule } from './admin-education-shift-routing.module';
import { AdminEducationShiftComponent } from './admin-education-shift.component';
import { AdminEducationShiftListComponent } from './components/admin-education-shift-list/admin-education-shift-list.component';
import { AdminEducationShiftAddComponent } from './components/admin-education-shift-add/admin-education-shift-add.component';
import { AdminEducationShiftViewComponent } from './components/admin-education-shift-view/admin-education-shift-view.component';
import { AdminEducationShiftEditComponent } from './components/admin-education-shift-edit/admin-education-shift-edit.component';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';

export function createTranslateLoader(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpBackend), './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AdminEducationShiftComponent, AdminEducationShiftListComponent, AdminEducationShiftAddComponent, AdminEducationShiftViewComponent, AdminEducationShiftEditComponent],
  imports: [
    CommonModule,
    AdminEducationShiftRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
    FullCalendarModule,
    FormsModule
  ]
})
export class AdminEducationShiftModule { }
