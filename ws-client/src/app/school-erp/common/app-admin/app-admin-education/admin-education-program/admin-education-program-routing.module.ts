import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationProgramComponent } from './admin-education-program.component';
import { AdminEducationProgramListComponent } from './components/admin-education-program-list/admin-education-program-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEducationProgramComponent,
    children:[
      {
        path:'list',
        component: AdminEducationProgramListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationProgramRoutingModule { }
