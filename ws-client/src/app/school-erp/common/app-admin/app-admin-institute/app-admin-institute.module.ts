import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MessagesModule } from 'primeng/messages';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppAdminInstituteRoutingModule } from './app-admin-institute-routing.module';
import { AppAdminInstituteComponent } from './app-admin-institute.component';
import { AdminInstituteCreateComponent } from './componenets/admin-institute-create/admin-institute-create.component';
import { AdminInstituteListComponent } from './componenets/admin-institute-list/admin-institute-list.component';
import { AdminInstituteViewComponent } from './componenets/admin-institute-view/admin-institute-view.component';
import { AdminInstituteEditComponent } from './componenets/admin-institute-edit/admin-institute-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { SwitchModule } from 'src/app/shared/switch/switch.module';
import { AdminConfigureInstituteScheduleMessageDialogComponent } from './componenets/admin-configure-institute-schedule-message-dialog/admin-configure-institute-schedule-message-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [AppAdminInstituteComponent, AdminInstituteCreateComponent, AdminInstituteListComponent, AdminInstituteViewComponent, AdminInstituteEditComponent, AdminConfigureInstituteScheduleMessageDialogComponent],
  imports: [
    CommonModule,
    AppAdminInstituteRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
    FullCalendarModule,
    FormsModule,
    TranslateModule,
    SwitchModule,
    NgSelectModule,
    FormsModule
  ]
})
export class AppAdminInstituteModule { }
