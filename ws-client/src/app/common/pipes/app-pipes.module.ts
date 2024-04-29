import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateFormat } from './date-format.pipe';
import { LocalCurrencyPipe } from './locale-currency.pipe';
import { LocalNumberPipe } from './locale-number.pipe';

@NgModule({
  imports: [CommonModule],
  providers: [
    DateFormat,
    LocalNumberPipe,
    LocalCurrencyPipe
  ],
  declarations: [
    DateFormat,
    LocalNumberPipe,
    LocalCurrencyPipe
  ],
  exports: [
    DateFormat,
    LocalNumberPipe,
    LocalCurrencyPipe
  ]
})
export class AppPipesModule { }
