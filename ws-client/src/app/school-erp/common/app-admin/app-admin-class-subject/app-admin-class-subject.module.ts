import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminClassSubjectComponent } from './app-admin-class-subject.component';
import { AdminClassSubjectCreateComponent } from './component/admin-class-subject-create/admin-class-subject-create.component';
import { AdminClassSubjectUpdateComponent } from './component/admin-class-subject-update/admin-class-subject-update.component';
import { AdminClassSubjectListComponent } from './component/admin-class-subject-list/admin-class-subject-list.component';
import { AdminClassSubjectViewComponent } from './component/admin-class-subject-view/admin-class-subject-view.component';
import { AppAdminClassSubjectSubjectRoutingModule } from './app-admin-class-subject-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';


@NgModule({
  declarations: [AdminClassSubjectCreateComponent, AdminClassSubjectUpdateComponent, AdminClassSubjectListComponent, AdminClassSubjectViewComponent],
  imports: [
    CommonModule,
    AppAdminClassSubjectSubjectRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule
  ]
})
export class AppAdminClassSubjectModule { }
