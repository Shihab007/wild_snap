import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpBackend } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';

import { AppSchoolComponent } from './app-school.component';
import { AppSchoolRoutingModule } from './app-school-routing.module';

@NgModule({
  declarations: [AppSchoolComponent],
  imports: [
    CommonModule,
    AppSchoolRoutingModule,
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
export class AppSchoolModule { }
