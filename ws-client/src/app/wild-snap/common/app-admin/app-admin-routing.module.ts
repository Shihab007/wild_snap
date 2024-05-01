import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminComponent } from './app-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./app-admin-dashboard/app-admin-dashboard.module').then(
            (m) => m.AppAdminDashboardModule
          ),
        //data: { title: extract('Dashboard') },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./app-admin-profile/app-admin-profile.module').then(
            (m) => m.AppAdminProfileModule
          ),
        //data: { title: extract('Profile') },
      },
      {
        path: 'user-list',
        loadChildren: () =>
          import('../app-admin/app-user-list/app-user-list.module').then(
            (m) => m.AppUserListModule
          ),
        //data: { title: extract('User List') },
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminRoutingModule { }
