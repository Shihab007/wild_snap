import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSmsFeatureComponent } from './admin-sms-feature.component';
import { AdminSmsFeatureEditComponent } from './components/admin-sms-feature-edit/admin-sms-feature-edit.component';
import { AdminSmsFeatureListComponent } from './components/admin-sms-feature-list/admin-sms-feature-list.component';
import { AdminSmsFeatureViewComponent } from './components/admin-sms-feature-view/admin-sms-feature-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSmsFeatureComponent,
    children: [
      {
        path: 'list',
        component: AdminSmsFeatureListComponent,

      },
      {
        path: 'view/:oid',
        component: AdminSmsFeatureViewComponent,

      },
      {
        path: 'edit/:oid',
        component: AdminSmsFeatureEditComponent,

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSmsFeatureRoutingModule { }
