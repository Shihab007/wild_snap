import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localCurrency',
  pure: false,
})
export class LocalCurrencyPipe implements PipeTransform {
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
  constructor(public translate: TranslateService) {}

  transform(number: any): string {
    //console.log(number);

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
    if (lang === 'en') {
      // tslint:disable-next-line: forin
      number = this.convertCurrency(number);
      return number;
    } else if (lang === 'bn') {
      // tslint:disable-next-line: forin
      number = this.convertEnglishToBangla(this.convertCurrency(number));
      return number;
    }
  }

  convertCurrency(value: any) {
    if (this.isNullOrEmpty(value)) {
      return '0';
    }
    var str = value.toString();
    var digit = '';
    if (str.indexOf('.') > -1) {
      digit = str.substring(str.length - 3, str.length);
      str = str.substring(0, str.length - 3);
    }
    if (str.length > 3) {
      var s = str.substring(0, str.length - 3);
      s = s.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      str = s + ',' + str.substring(str.length - 3, str.length);
    }
    return str + digit;
  }

  isNullOrEmpty = function (value: any) {
    return (
      value === null ||
      value === '' ||
      value === 'null' ||
      value === 'undefined' ||
      value === undefined
    );
  };

  convertEnglishToBangla(englishString: any) {
    if (this.isNullOrEmpty(englishString)) {
      return '';
    }
    var i;
    englishString = englishString.toString();
    var newStr = '';
    for (i = 0; i < englishString.length; i++) {
      switch (englishString[i]) {
        case '0':
          newStr += '০';
          break;
        case '1':
          newStr += '১';
          break;
        case '2':
          newStr += '২';
          break;
        case '3':
          newStr += '৩';
          break;
        case '4':
          newStr += '৪';
          break;
        case '5':
          newStr += '৫';
          break;
        case '6':
          newStr += '৬';
          break;
        case '7':
          newStr += '৭';
          break;
        case '8':
          newStr += '৮';
          break;
        case '9':
          newStr += '৯';
          break;
        default:
          newStr += englishString[i];
          break;
      }
    }

    return newStr;
  }
}
