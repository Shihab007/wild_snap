import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationGradingSystemComponent } from './admin-education-grading-system.component';
import { AdminEducationGradingSystemListComponent } from './components/admin-education-grading-system-list/admin-education-grading-system-list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminEducationGradingSystemComponent,
        children: [
            {
                path: 'list',
                component: AdminEducationGradingSystemListComponent,
                //data: { title: extract('Education Grading System List') },
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationGradingSystemRoutingModule { }
