import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localNumber',
  pure: false,
})
export class LocalNumberPipe implements PipeTransform {
  public finalEnlishToBanglaNumber = {
    '0': '\u09E6',
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
    '\u09E6': '0',
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
  constructor(public translate: TranslateService) {}

  transform(number: any): string {
    let lang: string;
    if (!this.translate.currentLang) {
      lang = this.translate.defaultLang;
    } else {
      lang = this.translate.currentLang;
    }

    if (number == 0 && lang === 'en') {
      return number;
    } else if (number == 0 && lang === 'bn') {
      return '\u09E6';
    }

    if (!number) {
      return;
    }

    if (lang === 'bn') {
      // tslint:disable-next-line: forin
      for (const x in this.finalEnlishToBanglaNumber) {
        number = number
          .toString()
          .replace(new RegExp(x, 'g'), this.finalEnlishToBanglaNumber[x]);
      }
      return number;
    } else if (lang === 'en') {
      // tslint:disable-next-line: forin
      for (const x in this.finalBanglaToEnlishNumber) {
        number = number
          .toString()
          .replace(new RegExp(x, 'g'), this.finalBanglaToEnlishNumber[x]);
      }
      return number;
    }
  }
}
