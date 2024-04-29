import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSchoolComponent } from './app-school.component';

const routes: Routes = [
  {
    path: '',
    component: AppSchoolComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../app-school/app-school-dashboard/app-school-dashboard.module').then(
            (m) => m.AppSchoolDashboardModule
          ),
        //data: { title: extract('Dashboard') },
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('./app-client-profile/app-school-profile.module').then(
            (m) => m.AppSchoolProfileModule
          ),
        //data: { title: extract('Profile') },
      },

      {
        path: 'institute',
        loadChildren: () =>
          import('../app-school/app-school-institute/app-school-institute.module').then(
            (m) => m.AppSchoolInstituteModule
          ),
        //data: { title: extract('Profile') },
      },

      {
        path: 'About-Us',
        loadChildren: () =>
          import('../app-school/app-school-exam/app-school-exam.module').then(
            (m) => m.AppSchoolExamModule
          ),
        //data: { title: extract('Exam') },
      },
      {
        path: 'exam-result',
        loadChildren: () =>
          import('../app-school/app-school-exam-result/app-school-exam-result.module').then(
            (m) => m.AppSchoolExamResultModule
          ),
        //data: { title: extract('Exam Result') },
      },


      {
        path: 'password',
        loadChildren: () =>
          import('../app-school/app-school-password/app-school-password.module').then(
            (m) => m.AppSchoolPasswordModule
          ),
      },
      {
        path: 'mark-sheet',
        loadChildren: () =>
          import('../app-school/app-school-exam-mark-sheet/app-school-exam-mark-sheet.module').then(
            (m) => m.AppSchoolExamMarkSheetModule
          ),

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchoolRoutingModule { }
function extract(arg0: string): any {
  throw new Error('Function not implemented.');
}

