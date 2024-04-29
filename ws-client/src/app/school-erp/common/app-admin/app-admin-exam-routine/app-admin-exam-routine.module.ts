import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminExamRoutineRoutingModule } from './app-admin-exam-routine-routing.module';
import { AdminExamRoutineAddComponent } from './component/admin-exam-routine-add/admin-exam-routine-add.component';
import { AdminExamRoutineListComponent } from './component/admin-exam-routine-list/admin-exam-routine-list.component';
import { AdminExamRoutineViewComponent } from './component/admin-exam-routine-view/admin-exam-routine-view.component';


@NgModule({
  declarations: [AdminExamRoutineAddComponent, AdminExamRoutineListComponent, AdminExamRoutineViewComponent],
  imports: [
    CommonModule,
    AppAdminExamRoutineRoutingModule
  ]
})
export class AppAdminExamRoutineModule { }
