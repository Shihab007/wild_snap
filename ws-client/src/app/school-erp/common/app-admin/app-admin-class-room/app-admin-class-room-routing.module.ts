import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminClassRoomComponent } from './app-admin-class-room.component';
import { ClassRoomAddComponent } from './component/class-room-add/class-room-add.component';
import { ClassRoomListComponent } from './component/class-room-list/class-room-list.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminClassRoomComponent,
    children:[
      {
        path: 'add',
        component: ClassRoomAddComponent,
      },
      {
        path: 'list',
        component: ClassRoomListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminClassRoomRoutingModule { }
