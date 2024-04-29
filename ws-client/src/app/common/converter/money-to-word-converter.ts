import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MoneyToWordConverter {
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

  // public convertNumber(n: Number) {
  //   if (n < 0) {
  //     return this.INVALID_INPUT_GIVEN;
  //   }
  //   if (n < 100) {
  //     return this.ones[n];
  //   }
  //   if (n < 1000) {
  //     return this.ones[ Math.floor(n / 100)] + " শত" + ((n % 100 != 0) ? " " : "") + this.convertNumber(n % 100);
  //   }
  //   if (n < 1_00_000) {
  //     return this.convertNumber(Math.floor(n / 1000)) + " হাজার" + ((n % 1000 != 0) ? " " : "") + this.convertNumber(n % 1000);
  //   }
  //   if (n < 1_00_00_000) {
  //     return this.convertNumber(Math.floor(n / 1_00_000)) + " লক্ষ" + ((n % 1_00_000 != 0) ? " " : "") + this.convertNumber(n % 1_00_000);
  //   }
  //   return this.convertNumber(Math.floor(n / 1_00_00_000)) + " কোটি" + ((n % 1_00_00_000 != 0) ? " " : "") + this.convertNumber(n % 1_00_00_000);
  // }

  getMoneyIntoWords(money: number) {
    // const taka = Math.round(money);
    // const poysa = Math.round((money - taka) * 100);
    // if (money == 0) {
    //   return "নিল";
    // }
    // if (money < 0) {
    //   return this.INVALID_INPUT_GIVEN;
    // }
    // let takaPart = "";
    // if (taka > 0) {
    //   takaPart = this.convertNumber(taka) + " টাকা";
    // }
    // let poiysaPart = "";
    // if (poysa > 0) {
    //   if (takaPart.length > 0) {
    //     poiysaPart = " এবং ";
    //   }
    //   poiysaPart += this.convertNumber(poysa) + " পয়সা";
    // }
    // return takaPart + poiysaPart;
  }
}
