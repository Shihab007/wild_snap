import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminEducationComponent } from './app-admin-education.component';

const routes: Routes = [
  {
    path: '',
    component: AppAdminEducationComponent,
    children: [
      {
        path: 'system',
        loadChildren: () => import('./admin-education-system/admin-education-system.module').then(m => m.AdminEducationSystemModule),
        //data: { title: extract('Education System') },
      },
      {
        path: 'type',
        loadChildren: () => import('./admin-education-type/admin-education-type.module').then(m => m.AdminEducationTypeModule),
        //data: { title: extract('Education Type') },
      },
      {
        path: 'program',
        loadChildren: () => import('./admin-education-program/admin-education-program.module').then(m => m.AdminEducationProgramModule),
        //data: { title: extract('Education Program') },
      },
      {
        path: 'subject',
        loadChildren: () => import('./admin-education-subject/admin-education-subject.module').then(m => m.AdminEducationSubjectModule),
        //data: { title: extract('Education Subject') },
      },
      {
        path: 'textbook',
        loadChildren: () => import('./admin-education-textbook/admin-education-textbook.module').then(m => m.AdminEducationTextbookModule),
        //data: { title: extract('Education Type') },
      },
      {
        path: 'grading-system',
        loadChildren: () => import('./admin-education-grading-system/admin-education-grading-system.module').then(m => m.AdminEducationGradingSystemModule),
        //data: { title: extract('Education Grading System') },
      },
      {
        path: 'board',
        loadChildren: () => import('./admin-education-board/admin-education-board.module').then(m => m.AdminEducationBoardModule),
        //data: { title: extract('Education Board') },
      },
      {
        path: 'shift',
        loadChildren: () => import('./admin-education-shift/admin-education-shift.module').then(m => m.AdminEducationShiftModule),
        //data: { title: extract('Education shift') },
      },
      {
        path: 'session',
        loadChildren: () => import('./admin-education-session/admin-education-session.module').then(m => m.AdminEducationSessionModule),
        //data: { title: extract('Education shift') },
      },
      {
        path: 'curriculum',
        loadChildren: () => import('./admin-education-curriculum/admin-education-curriculum.module').then(m => m.AdminEducationCurriculumModule),
        //data: { title: extract('Education shift') },
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminEducationRoutingModule { }
