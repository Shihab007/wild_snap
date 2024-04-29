import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminExamResultRoutingModule } from './app-admin-exam-result-routing.module';
import { AdminExamResultAddComponent } from './component/admin-exam-result-add/admin-exam-result-add.component';
import { AdminExamResultListComponent } from './component/admin-exam-result-list/admin-exam-result-list.component';


@NgModule({
  declarations: [AdminExamResultAddComponent, AdminExamResultListComponent],
  imports: [
    CommonModule,
    AppAdminExamResultRoutingModule
  ]
})
export class AppAdminExamResultModule { }
