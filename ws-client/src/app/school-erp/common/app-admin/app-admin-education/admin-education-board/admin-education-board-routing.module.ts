import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEducationBoardComponent } from './admin-education-board.component';
import { AdminEducationBoardListComponent } from './components/admin-education-board-list/admin-education-board-list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminEducationBoardComponent,
        children: [
            {
                path: 'list',
                component: AdminEducationBoardListComponent,
                //data: { title: extract('Education Board List') },
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEducationBoardRoutingModule { }
