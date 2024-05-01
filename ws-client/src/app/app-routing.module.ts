import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LocalStorageComponent } from './common/local-storage/local-storage.component';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: 'home', component: LandingPageComponent },
  // { path: '', component: LandingPageComponent},
  // { path: 'callback', component: CallbackComponent },
  { path: 'local-storage', component: LocalStorageComponent },



  {
    path: 'dashboard',
    loadChildren: () => import('./wild-snap/common/app-user/app-school-dashboard/app-school-dashboard.module').then((m) => m.AppSchoolDashboardModule
    ),
    canActivate: [AuthGuard]
    //data: { title: extract('Dashboard') },
  },
  {
    path: 'admin',
    loadChildren: () => import('./wild-snap/common/app-admin/app-admin.module').then(m => m.AppAdminModule),
    //data: { title: extract('Admin') },
    canActivate: [AuthGuard]
  },
  {
    path: 'wild-snap',
    loadChildren: () => import('./wild-snap/common/app-user/app-school.module').then(m => m.AppSchoolModule),
    //data: { title: extract('School') },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then(m => m.LoginModule),
  },
  // {
  //   path: 'landingpage',
  //   loadChildren: () => import('./land-page/land-page.module').then(m => m.LandPageModule)
  // },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '', redirectTo: 'wild-snap/dashboard', pathMatch: 'full' },

  // { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule, TranslateModule]
})
export class AppRoutingModule { }
// function extract(arg0: string): any {
//     throw new Error('Function not implemented.');
// }

export function extract(s: string) {
  return s;
}

