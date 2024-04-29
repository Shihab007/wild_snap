import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminGuardianRoutingModule } from './app-admin-guardian-routing.module';
import { AppAdminGuardianComponent } from './app-admin-guardian.component';
import { AdminGuardianAddComponent } from './component/admin-guardian-add/admin-guardian-add.component';
import { AdminGuardianListComponent } from './component/admin-guardian-list/admin-guardian-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [AppAdminGuardianComponent, AdminGuardianAddComponent, AdminGuardianListComponent],
  imports: [
    CommonModule,
    AppAdminGuardianRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
    MatSelectModule,
    BsDatepickerModule.forRoot(),
    MatButtonModule,
    MatFormFieldModule,
  ]
})
export class AppAdminGuardianModule { }
