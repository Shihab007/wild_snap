import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSchoolInstituteComponent } from './app-school-institute.component';
import { SchoolInstituteEditComponent } from './components/school-institute-edit/school-institute-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AppSchoolInstituteComponent,
    children: [
      // {
      //   path: 'view/:oid',
      //   component: SchoolExpenseViewComponent,
      //   //data: { title: extract('Exam Routine List') },
      // },
      {
        path: 'edit/:oid',
        component: SchoolInstituteEditComponent,
        //data: { title: extract('Exam Routine List') },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchoolInstituteRoutingModule { }
