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
          import('../app-admin/app-admin-dashboard/app-admin-dashboard.module').then(
            (m) => m.AppAdminDashboardModule
          ),
        //data: { title: extract('Dashboard') },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../app-admin/app-admin-profile/app-admin-profile.module').then(
            (m) => m.AppAdminProfileModule
          ),
        //data: { title: extract('Profile') },
      },
      {
        path: 'institute',
        loadChildren: () =>
          import('../app-admin/app-admin-institute/app-admin-institute.module').then(
            (m) => m.AppAdminInstituteModule
          ),
        //data: { title: extract('Guardian') },
      },
      {
        path: 'education',
        loadChildren: () =>
          import('../app-admin/app-admin-education/app-admin-education.module').then(
            (m) => m.AppAdminEducationModule
          ),
        //data: { title: extract('Education') },
      },

      {
        path: 'guardian',
        loadChildren: () =>
          import('../app-admin/app-admin-guardian/app-admin-guardian.module').then(
            (m) => m.AppAdminGuardianModule
          ),
        //data: { title: extract('Guardian') },
      },
      {
        path: 'class-subject',
        loadChildren: () =>
          import('../app-admin/app-admin-class-subject/app-admin-class-subject.module').then(
            (m) => m.AppAdminClassSubjectModule
          ),
        //data: { title: extract('Class') },
      },
      {
        path: 'class-room',
        loadChildren: () =>
          import('../app-admin/app-admin-class-room/app-admin-class-room.module').then(
            (m) => m.AppAdminClassRoomModule
          ),
        //data: { title: extract('Class Room') },
      },
      {
        path: 'class-routine',
        loadChildren: () =>
          import('../app-admin/app-admin-class-routine/app-admin-class-routine.module').then(
            (m) => m.AppAdminClassRoutineModule
          ),
        //data: { title: extract('Class Routine') },
      },
      {
        path: 'exam',
        loadChildren: () =>
          import('../app-admin/app-admin-exam/app-admin-exam.module').then(
            (m) => m.AppAdminExamModule
          ),
        //data: { title: extract('Exam') },
      },
      {
        path: 'exam-routine',
        loadChildren: () =>
          import('../app-admin/app-admin-exam-routine/app-admin-exam-routine.module').then(
            (m) => m.AppAdminExamRoutineModule
          ),
        //data: { title: extract('Exam Routine') },
      },
      {
        path: 'exam-result',
        loadChildren: () =>
          import('../app-admin/app-admin-exam-result/app-admin-exam-result.module').then(
            (m) => m.AppAdminExamResultModule
          ),
        //data: { title: extract('Exam Result') },
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('../app-admin/app-admin-notification/app-admin-notification.module').then(
            (m) => m.AppAdminNotificationModule
          ),
        //data: { title: extract('Admin Notification') },
      }


      // {
      //   path: 'institute',
      //   loadChildren: () =>
      //     import('../app-admin/app-admin-institute/app-admin-institute-routing.module').then(
      //       (m) => m.AppAdminInstituteRoutingModule
      //     ),
      //   //data: { title: extract('Exam Result') },
      // }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminRoutingModule { }
