import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSmsServiceComponent } from './admin-sms-service.component';
import { AdminInstituteSmsServiceListComponent } from './components/admin-institute-sms-service-list/admin-institute-sms-service-list.component';
import { AdminInstituteSmsServiceLogListComponent } from './components/admin-institute-sms-service-log-list/admin-institute-sms-service-log-list.component';
import { AdminSmsServiceListComponent } from './components/admin-sms-service-list/admin-sms-service-list.component';
import { AdminSmsServiceViewComponent } from './components/admin-sms-service-view/admin-sms-service-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSmsServiceComponent,
    children: [
      {
        path: 'list',
        component: AdminInstituteSmsServiceListComponent,
        //data: { title: extract('SMS Service List') },
      },
      {
        path: 'log/:oid',
        component: AdminInstituteSmsServiceLogListComponent,
        //data: { title: extract('SMS Service List') },
      },
      {
        path: 'view/:oid',
        component: AdminSmsServiceViewComponent,
        //data: { title: extract('SMS Service View') },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSmsServiceRoutingModule { }
