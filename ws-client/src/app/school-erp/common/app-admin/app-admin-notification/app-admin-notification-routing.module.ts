import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminNotificationComponent } from './app-admin-notification.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminNotificationComponent,
    children: [
      {
        path: 'sms-dashboard',
        loadChildren: () => import('./admin-sms-dashboard/admin-sms-dashboard.module').then(m => m.AdminSmsDashboardModule),
        //data: { title: extract('SMS Dashboard') },
      },
      {
        path: 'sms-feature',
        loadChildren: () => import('./admin-sms-feature/admin-sms-feature.module').then(m => m.AdminSmsFeatureModule),
        //data: { title: extract('SMS Feature') },
      },
      {
        path: 'sms-service',
        loadChildren: () => import('./admin-sms-service/admin-sms-service.module').then(m => m.AdminSmsServiceModule),
        //data: { title: extract('SMS Service') },
      },
      {
        path: 'sms-service-setting',
        loadChildren: () => import('./admin-sms-service-settings/admin-sms-service-settings.module').then(m => m.AdminSmsServiceSettingsModule),
        //data: { title: extract('SMS Service Settings') },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminNotificationRoutingModule { }
