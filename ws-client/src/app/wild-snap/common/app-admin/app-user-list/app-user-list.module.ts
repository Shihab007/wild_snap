import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppUserListRoutingModule } from './app-user-list-routing.module';
import { AppUserListComponent } from './app-user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AppUserListComponent
  ],
  imports: [
    CommonModule,
    AppUserListRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule
  ]
})
export class AppUserListModule { }
