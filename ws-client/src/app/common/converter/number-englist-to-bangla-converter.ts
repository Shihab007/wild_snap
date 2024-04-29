import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NumberEnglishToBanglaConverter {
  public finalEnlishToBanglaNumber = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };

  public finalBanglaToEnlishNumber = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
  };

  transform(number: any): string {
    if (!number) {
      return;
    }
    // tslint:disable-next-line: forin
    for (const x in this.finalEnlishToBanglaNumber) {
      number = number
        .toString()
        .replace(new RegExp(x, 'g'), this.finalEnlishToBanglaNumber[x]);
    }
    return number;
  }
}
