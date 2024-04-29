import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEducationBoardRoutingModule } from './admin-education-board-routing.module';
import { AdminEducationBoardComponent } from './admin-education-board.component';
import { AdminEducationBoardListComponent } from './components/admin-education-board-list/admin-education-board-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [AdminEducationBoardComponent, AdminEducationBoardListComponent],
  imports: [
    CommonModule,
    AdminEducationBoardRoutingModule,
    SharedModule,
    CommonLayoutModule,
    FullCalendarModule,
    FormsModule,
    MaterialCustomModule,
    MessagesModule,
  ]
})
export class AdminEducationBoardModule { }
