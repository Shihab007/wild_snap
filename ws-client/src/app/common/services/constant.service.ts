import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerConfiguration } from 'src/app/wild-snap/common/shared/model/ngx-spinner-configuration';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  private INVALID_INPUT_GIVEN: string = 'Invalid input';
  private ones = [
    '',
    'এক',
    'দুই',
    'তিন',
    'চার',
    'পাঁচ',
    'ছয়',
    'সাত',
    'আট',
    'নয়',
    'দশ',
    'এগারো',
    'বারো',
    'তের',
    'চৌদ্দ',
    'পনেরো',
    'ষোল',
    'সতেরো',
    'আঠারো',
    'উনিশ',
    'বিশ',
    'একুশ',
    'বাইশ',
    'তেইশ',
    'চব্বিশ',
    'পঁচিশ',
    'ছাব্বিশ',
    'সাতাশ',
    'আটাশ',
    'ঊনত্রিশ',
    'ত্রিশ',
    'একত্রিশ',
    'বত্রিশ',
    'তেত্রিশ',
    'চৌত্রিশ',
    'পঁয়ত্রিশ',
    'ছত্রিশ',
    'সাইত্রিশ',
    'আটত্রিশ',
    'ঊনচল্লিশ',
    'চল্লিশ',
    'একচল্লিশ',
    'বিয়াল্লিশ',
    'তেতাল্লিশ',
    'চুয়াল্লিশ',
    'পঁয়তাল্লিশ',
    'ছিচল্লিশ',
    'সাতচল্লিশ',
    'আটচল্লিশ',
    'ঊনপঞ্চাশ',
    'পঞ্চাশ',
    'একান্ন',
    'বায়ান্ন',
    'তেপ্পান্ন',
    'চুয়ান্ন',
    'পঞ্চান্ন',
    'ছাপ্পান্ন',
    'সাতান্ন',
    'আটান্ন',
    'ঊনষাট',
    'ষাট',
    'একষট্টি',
    'বাষট্টি',
    'তেষট্টি',
    'চৌষট্টি',
    'পঁয়ষট্টি',
    'ছেষট্টি',
    'সাতষট্টি',
    'আটষট্টি',
    'উনসত্তুর',
    'সত্তর',
    'একাত্তর',
    'বাহাত্তর',
    'তেহাত্তুর',
    'চুহাত্তর',
    'পঁচাত্তর',
    'ছিয়াত্তর',
    'সাতাত্তর',
    'আটাত্তর',
    'উনাশি',
    'আশি',
    'একাশি',
    'বিরাশি',
    'তিরাশি',
    'চুরাশি',
    'পঁচাশি',
    'ছিয়াশি',
    'সাতাশি',
    'আটাশি',
    'ঊনানব্বুই',
    'নব্বই',
    'একানব্বই',
    'বিরানব্বই',
    'তিরানব্বই',
    'চুরানব্বই',
    'পঁচানব্বই',
    'ছিয়ানব্বই',
    'সাতানব্বই',
    'আটানব্বই',
    'নিরানব্বই',
  ];

  constructor() { }

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

  setMMMdateToMMdate(value: any) {
    var strValue = value.toString();
    strValue = moment(value).format('YYYY-MM-DD');
    return strValue;
  }

  getMMdateToMMMdate(value: any) {
    var strValue = value.toString();
    strValue = moment(value).format('YYYY-MMM-DD');
    return strValue;
  }

  setDateWithFormatType(value: any, formatType: string) {
    var strValue;
    if (value != undefined || value != null) {
      strValue = value.toString();
      strValue = moment(value).format(formatType);
    }
    return strValue;
  }

  private convert(n: number): any {
    if (n < 0) {
      return this.INVALID_INPUT_GIVEN;
    }
    if (n < 100) {
      return this.ones[n];
    }
    if (n < 1000) {
      return (
        this.ones[Math.floor(n / 100)] +
        ' শত' +
        (n % 100 != 0 ? ' ' : '') +
        this.convert(n % 100)
      );
    }
    if (n < 1_00_000) {
      return (
        this.convert(Math.floor(n / 1000)) +
        ' হাজার' +
        (n % 1000 != 0 ? ' ' : '') +
        this.convert(n % 1000)
      );
    }
    if (n < 1_00_00_000) {
      return (
        this.convert(Math.floor(n / 1_00_000)) +
        ' লক্ষ' +
        (n % 1_00_000 != 0 ? ' ' : '') +
        this.convert(n % 1_00_000)
      );
    }
    return (
      this.convert(Math.floor(n / 1_00_00_000)) +
      ' কোটি' +
      (n % 1_00_00_000 != 0 ? ' ' : '') +
      this.convert(n % 1_00_00_000)
    );
  }

  getMoneyIntoWords(money: number) {
    const taka = Math.round(money);
    const poysa = Math.round((money - taka) * 100);
    if (money == 0) {
      return 'নিল';
    }
    if (money < 0) {
      return this.INVALID_INPUT_GIVEN;
    }
    let takaPart = '';
    if (taka > 0) {
      takaPart = this.convert(taka) + ' টাকা';
    }
    let poiysaPart = '';
    if (poysa > 0) {
      if (takaPart.length > 0) {
        poiysaPart = ' এবং ';
      }
      poiysaPart += this.convert(poysa) + ' পয়সা';
    }
    return takaPart + poiysaPart;
  }

  calculateAge(fromdate: Date) {
    var todate: Date = new Date();
    if (todate) todate = new Date(todate);
    else todate = new Date();
    var age = [],
      fromdate = new Date(fromdate),
      y = [todate.getFullYear(), fromdate.getFullYear()],
      ydiff = y[0] - y[1],
      m = [todate.getMonth(), fromdate.getMonth()],
      mdiff = m[0] - m[1],
      d = [todate.getDate(), fromdate.getDate()],
      ddiff = d[0] - d[1];

    if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) --ydiff;
    if (mdiff < 0) mdiff += 12;
    if (ddiff < 0) {
      fromdate.setMonth(m[1] + 1, 0);
      ddiff = fromdate.getDate() - d[1] + d[0];
      --mdiff;
    }
    // if (ydiff > 0) age.push(ydiff + ' year' + (ydiff > 1 ? 's ' : ' '));
    // if (mdiff > 0) age.push(mdiff + ' month' + (mdiff > 1 ? 's' : ''));
    // if(ddiff> 0) age.push(ddiff+ ' day'+(ddiff> 1? 's':''));
    // if (age.length > 1) age.splice(age.length - 1, 0, ' and ');
    return ydiff;
  }

  calculateAgeEn(fromdate: Date) {
    var todate: Date = new Date();
    if (todate) todate = new Date(todate);
    else todate = new Date();
    var age = [],
      fromdate = new Date(fromdate),
      y = [todate.getFullYear(), fromdate.getFullYear()],
      ydiff = y[0] - y[1],
      m = [todate.getMonth(), fromdate.getMonth()],
      mdiff = m[0] - m[1],
      d = [todate.getDate(), fromdate.getDate()],
      ddiff = d[0] - d[1];

    if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) --ydiff;
    if (mdiff < 0) mdiff += 12;
    if (ddiff < 0) {
      fromdate.setMonth(m[1] + 1, 0);
      ddiff = fromdate.getDate() - d[1] + d[0];
      --mdiff;
    }
    if (ydiff > 0) age.push(ydiff + ' year' + (ydiff > 1 ? 's ' : ' '));
    if (mdiff > 0) age.push(mdiff + ' month' + (mdiff > 1 ? 's' : ''));
    // if(ddiff> 0) age.push(ddiff+ ' day'+(ddiff> 1? 's':''));
    if (age.length > 1) age.splice(age.length - 1, 0, ' and ');
    return age.join('');
  }

  calculateAgeBn(fromdate: Date) {
    var todate: Date = new Date();
    if (todate) todate = new Date(todate);
    else todate = new Date();

    var age = [],
      fromdate = new Date(fromdate),
      y = [todate.getFullYear(), fromdate.getFullYear()],
      ydiff = y[0] - y[1],
      m = [todate.getMonth(), fromdate.getMonth()],
      mdiff = m[0] - m[1],
      d = [todate.getDate(), fromdate.getDate()],
      ddiff = d[0] - d[1];

    if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) --ydiff;
    if (mdiff < 0) mdiff += 12;
    if (ddiff < 0) {
      fromdate.setMonth(m[1] + 1, 0);
      ddiff = fromdate.getDate() - d[1] + d[0];
      --mdiff;
    }
    if (ydiff > 0)
      age.push(
        this.convertEnglishToBangla(ydiff) + ' বছর' + (ydiff > 1 ? '' : ' ')
      );
    if (mdiff > 0)
      age.push(
        this.convertEnglishToBangla(mdiff) + ' মাস' + (mdiff > 1 ? '' : '')
      );
    // if(ddiff> 0) age.push(ddiff+ ' day'+(ddiff> 1? 's':''));
    if (age.length > 1) age.splice(age.length - 1, 0, ' এবং ');
    return age.join('');
  }

  toCapitalizeWord(word: string) {
    const arr = word.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const capitalizeValue = arr.join(' ');
    return capitalizeValue;
  }

  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  keyPressNumbersWithDecimal(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  keyPressAlphanumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  getNgxSpinnerConfiguration() {
    let obj: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();
    obj.color = "#181818"
    obj.bdColor = "rgba(0,0,0,0.29)"
    obj.size = "large"
    obj.type = "ball-clip-rotate-multiple"
    return obj;
  }

}
