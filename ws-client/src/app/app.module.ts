import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { CommonLayoutModule } from './common/common-layout.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MaterialCustomModule } from './material-custom/material-custom.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxImageCompressService } from 'ngx-alldone-image-compress';
import { RouterModule } from "@angular/router";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export function createTranslateLoader(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpBackend), '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  exports: [],
  entryComponents: [],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }, NgxImageCompressService],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    CommonLayoutModule,
    BrowserModule,
    MaterialCustomModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpBackend]
      }
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:7070'],
        sendAccessToken: true,
      },
    }),
    SharedModule,
    NgxExtendedPdfViewerModule,
    NgxSpinnerModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class AppModule { }
