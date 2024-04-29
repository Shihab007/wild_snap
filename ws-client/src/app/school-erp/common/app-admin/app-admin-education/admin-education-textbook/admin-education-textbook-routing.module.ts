import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationTextbookComponent } from './admin-education-textbook.component';
import { AdminEducationTextbookCreateComponent } from './components/admin-education-textbook-create/admin-education-textbook-create.component';
import { AdminEducationTextbookListComponent } from './components/admin-education-textbook-list/admin-education-textbook-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEducationTextbookComponent,
    children: [

      {
        path: 'add',
        component: AdminEducationTextbookCreateComponent,
        //data: { title: extract('Education Textbook create') },
      },
      {
        path: 'list',
        component: AdminEducationTextbookListComponent,
        //data: { title: extract('Education Textbook List') },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationTextbookRoutingModule { }
