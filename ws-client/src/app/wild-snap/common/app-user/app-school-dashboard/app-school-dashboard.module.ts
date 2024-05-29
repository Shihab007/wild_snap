import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AppSchoolDashboardRoutingModule } from './app-school-dashboard-routing.module';
import { AppSchoolDashboardComponent } from './app-school-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [AppSchoolDashboardComponent],
  imports: [
    CommonModule,
    AppSchoolDashboardRoutingModule,
    SharedModule,
    MaterialCustomModule,
    FormsModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot(),
    MatDatepickerModule,
  ],
  providers: [DatePipe],
})
export class AppSchoolDashboardModule { }
