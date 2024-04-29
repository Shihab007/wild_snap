import { Pipe, PipeTransform } from '@angular/core';
import { MoneyToWordConverter } from '../converter/money-to-word-converter';

@Pipe({ name: 'inwords', pure: false })
export class InWordsPipe implements PipeTransform {
  constructor(private moneyToWordConverter: MoneyToWordConverter) {}

  transform(value: number): any {
    return this.moneyToWordConverter.getMoneyIntoWords(value);
  }
}
