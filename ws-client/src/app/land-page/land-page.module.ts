import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandPageComponent } from './land-page.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../shared/shared.module';
import { LandPageRoutingModule } from './land-page-routing.module';
import { LandpageContentComponent } from './components/landpage-content/landpage-content.component';
import { Header } from './components/header/header.component';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { FooterComponent } from './components/footer/footer.component';
import { AdmissionFormComponent } from './components/admission-form/admission-form.component';
import { AcademicsComponent } from './components/academics/academics.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


export function createTranslateLoader(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpBackend), './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LandPageComponent,
    LandpageContentComponent,
    Header,
    FooterComponent,
    AdmissionFormComponent,
    AcademicsComponent,
    AboutComponent,
    ContactUsComponent,

  ],
  providers: [
    LandpageContentComponent,
    Header,
  ],
  imports: [
    MaterialCustomModule,
    CommonModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    LandPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpBackend]
      }
    }),
    ToastrModule.forRoot(),
  ],
  exports: [
    LandpageContentComponent,
    Header,
  ]
})
export class LandPageModule { }
