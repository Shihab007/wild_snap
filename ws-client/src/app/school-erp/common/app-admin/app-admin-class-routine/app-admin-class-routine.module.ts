import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminClassRoutineRoutingModule } from './app-admin-class-routine-routing.module';
import { AdminClassRoutineAddComponent } from './component/admin-class-routine-add/admin-class-routine-add.component';
import { AdminClassRoutineListComponent } from './component/admin-class-routine-list/admin-class-routine-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AdminClassRoutineAddComponent, AdminClassRoutineListComponent],
  imports: [
    CommonModule,
    AppAdminClassRoutineRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MatAutocompleteModule,
    MessagesModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: createTranslateLoader,
    //     deps: [HttpBackend]
    //   }
    // }),
    TranslateModule
  ]
})
export class AppAdminClassRoutineModule { }
