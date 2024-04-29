import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({ name: 'commonDateFormat', pure: false })
export class CommonDateFormat implements PipeTransform {
  transform(value: any) {
    return formatDate(value, 'dd-MM-YYYY', 'en-US');
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
}




