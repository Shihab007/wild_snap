import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationSessionComponent } from './admin-education-session.component';
import { AdminEducationSessionAddComponent } from './components/admin-education-session-add/admin-education-session-add.component';
import { AdminEducationSessionCloneComponent } from './components/admin-education-session-clone/admin-education-session-clone.component';
import { AdminEducationSessionConfigureComponent } from './components/admin-education-session-configure/admin-education-session-configure.component';
import { AdminEducationSessionEditComponent } from './components/admin-education-session-edit/admin-education-session-edit.component';
import { AdminEducationSessionListComponent } from './components/admin-education-session-list/admin-education-session-list.component';
import { AdminEducationSessionViewComponent } from './components/admin-education-session-view/admin-education-session-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEducationSessionComponent,
    children: [
      {
        path: 'list',
        component: AdminEducationSessionListComponent
      },
      {
        path: 'view/:oid',
        component: AdminEducationSessionViewComponent
      },
      {
        path: 'add',
        component: AdminEducationSessionAddComponent
      },
      {
        path: 'edit/:oid',
        component: AdminEducationSessionEditComponent
      },
      {
        path: 'clone/:oid',
        component: AdminEducationSessionCloneComponent
      },
      {
        path: 'configure/:oid',
        component: AdminEducationSessionConfigureComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationSessionRoutingModule { }
