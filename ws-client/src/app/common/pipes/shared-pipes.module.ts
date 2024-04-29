import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalNumberPipe } from './locale-number.pipe';
import { LocalCurrencyPipe } from './locale-currency.pipe';
import { DateLocaleFilter } from './date-locale-filter';
import { CommonDateFormat } from './common-date-format';



@NgModule({
  imports: [CommonModule],
  providers: [
    LocalNumberPipe,
    LocalCurrencyPipe,
    DateLocaleFilter,
    CommonDateFormat
  ],
  declarations: [
    LocalNumberPipe,
    LocalCurrencyPipe,
    DateLocaleFilter,
    CommonDateFormat
  ],
  exports: [
    LocalNumberPipe,
    LocalCurrencyPipe,
    DateLocaleFilter,
    CommonDateFormat
  ]
})
export class SharedPipesModule { }
