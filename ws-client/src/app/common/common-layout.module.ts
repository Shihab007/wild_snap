import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { LocalStorageComponent } from './local-storage/local-storage.component';


@NgModule({
  declarations: [SidebarComponent, NavbarComponent, LocalStorageComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    ToastrModule.forRoot()
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDropdownModule,
    PerfectScrollbarModule,
    ToastrModule
  ]
})
export class CommonLayoutModule { }
