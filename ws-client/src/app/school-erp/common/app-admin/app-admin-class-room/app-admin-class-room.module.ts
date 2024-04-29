import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminClassRoomRoutingModule } from './app-admin-class-room-routing.module';
import { ClassRoomAddComponent } from './component/class-room-add/class-room-add.component';
import { ClassRoomListComponent } from './component/class-room-list/class-room-list.component';


@NgModule({
  declarations: [ClassRoomAddComponent, ClassRoomListComponent],
  imports: [
    CommonModule,
    AppAdminClassRoomRoutingModule
  ]
})
export class AppAdminClassRoomModule { }
