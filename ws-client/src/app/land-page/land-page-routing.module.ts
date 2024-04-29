import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Header } from './components/header/header.component';
import { LandPageComponent } from './land-page.component';
import { LandpageContentComponent } from './components/landpage-content/landpage-content.component';
import { AdmissionFormComponent } from './components/admission-form/admission-form.component';
import { AcademicsComponent } from './components/academics/academics.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: LandPageComponent,
    children: [
      // {
      //   path:'',
      //   component:Component1Component,
      //   pathMatch:'full'
      // },
      {
        path: '',
        component: LandpageContentComponent,
        pathMatch: 'full'
      },
      {
        path: 'academics',
        component: AcademicsComponent,
        pathMatch: 'full'
      },
      {
        path: 'admission-form',
        component: AdmissionFormComponent,
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent,
        pathMatch: 'full'
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        pathMatch: 'full'
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandPageRoutingModule { }
