import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { CommonChangePasswordComponent } from './common-change-password/common-change-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxEditorModule } from 'ngx-editor';
import { CustomSwitchModule } from './custom-switch/custom-switch.module';
import { SharedPipesModule } from '../common/pipes/shared-pipes.module';

@NgModule({
  declarations: [CommonChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FontAwesomeModule,
    NgSelectModule,
    NgxEditorModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    ToastrModule.forRoot(),
    SharedPipesModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FontAwesomeModule,
    NgSelectModule,
    NgxEditorModule,
    NgxSpinnerModule,
    BsDropdownModule,
    PerfectScrollbarModule,
    ToastrModule,
    SharedPipesModule,
  ]
})
export class SharedModule { }
