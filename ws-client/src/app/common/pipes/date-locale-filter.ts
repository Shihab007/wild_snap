import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({ name: 'dateLocale', pure: false })
export class DateLocaleFilter implements PipeTransform {
  constructor(public translate: TranslateService) { }
  transform(value: string, dateFormat: string): any {
    let lang: string;
    if (!this.translate.currentLang) {
      lang = this.translate.defaultLang;
    } else {
      lang = this.translate.currentLang;
    }
    if (!this.isNullOrEmpty(value)) {
      return '';
    }
    debugger;
    if (this.isNullOrEmpty(dateFormat)) {
      dateFormat = 'Do MMMM, YYYY';
    } else {
      var dateFormatStr = dateFormat.toLocaleLowerCase();
      var count = dateFormatStr.split('m').length - 1;
      if (count > 2 && lang === 'bn') {
        dateFormat = 'Do MMMM, YYYY';
      }
    }
    moment.locale(lang);
    const dateLocale = moment.utc(value).local();

    console.log('dateLocale.format(dateFormat):::::');
    console.log(dateLocale.format(dateFormat));

    return dateLocale.format(dateFormat);
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

  // var count = (dateFormat.toLocaleLowerCase().match('m') || []).length;
  // var count1 = dateFormat.toLocaleLowerCase() || [].map(i => !!~i.indexOf('m')).filter(i => i).length;
}
