import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSmsServiceSettingsComponent } from './admin-sms-service-settings.component';
import { AdminSmsServiceSettingsAddComponent } from './components/admin-sms-service-settings-add/admin-sms-service-settings-add.component';
import { AdminSmsServiceSettingsListComponent } from './components/admin-sms-service-settings-list/admin-sms-service-settings-list.component';
import { AdminSmsServiceSettingsViewComponent } from './components/admin-sms-service-settings-view/admin-sms-service-settings-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSmsServiceSettingsComponent,
    children: [
      {
        path: 'list',
        component: AdminSmsServiceSettingsListComponent,
        //data: { title: extract('SMS Service Settings List') },
      },
      {
        path: 'add',
        component: AdminSmsServiceSettingsAddComponent,
        //data: { title: extract('SMS Service Settings View') },
      },
      {
        path: 'view/:oid',
        component: AdminSmsServiceSettingsViewComponent,
        //data: { title: extract('SMS Service Settings View') },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSmsServiceSettingsRoutingModule { }
