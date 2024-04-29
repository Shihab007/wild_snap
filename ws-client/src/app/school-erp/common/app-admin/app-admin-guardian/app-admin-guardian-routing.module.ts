import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminGuardianComponent } from './app-admin-guardian.component';
import { AdminGuardianAddComponent } from './component/admin-guardian-add/admin-guardian-add.component';
import { AdminGuardianListComponent } from './component/admin-guardian-list/admin-guardian-list.component';

const routes: Routes = [{
  path:'',
  component: AppAdminGuardianComponent,
  children:[
    {
      path: 'add',
      component: AdminGuardianAddComponent
    },
    {
      path: 'list',
      component: AdminGuardianListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminGuardianRoutingModule { }
