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
          import('./app-school-dashboard/app-school-dashboard.module').then(
            (m) => m.AppSchoolDashboardModule
          ),
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('./app-client-profile/app-school-profile.module').then(
            (m) => m.AppSchoolProfileModule
          ),
      },
      {
        path: 'classify-image',
        loadChildren: () =>
          import('./classify-image/classify-image.module').then(
            (m) => m.ClassifyImageModule
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

