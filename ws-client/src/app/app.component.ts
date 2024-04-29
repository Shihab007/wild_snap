import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_APP_LANGUAGE } from './common/constant/constant';
import { I18nService } from './i18n';

import { DEFAULT_LANG } from '../app/common/constant/constant';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AppComponent implements OnInit {

  title = 'WILD-SNAP';

  constructor(
    private i18nService: I18nService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate.currentLang = DEFAULT_LANG;
    console.log("=================== App Component =================== ");


    console.log(this.translate.currentLang);
    // this.translate.use(DEFAULT_APP_LANGUAGE);
    // this.translate.setDefaultLang(DEFAULT_APP_LANGUAGE);
    // document.documentElement.setAttribute('lang', DEFAULT_APP_LANGUAGE);

    // this.translate.use('bn');
    // this.translate.setDefaultLang('bn');
    // this.translate.currentLang = 'bn';
    // document.documentElement.setAttribute('lang', 'bn');

    console.log(this.translate.currentLang);
    console.log(this.translate.currentLang);
    console.log("=================== App Component =================== ");

  }

}
