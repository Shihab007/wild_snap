import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationTypeComponent } from './admin-education-type.component';
import { AdminEducationTypeListComponent } from './components/admin-education-type-list/admin-education-type-list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminEducationTypeComponent,
        children: [
            {
                path: 'list',
                component: AdminEducationTypeListComponent,
                //data: { title: extract('Education System List') },
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationTypeRoutingModule { }
