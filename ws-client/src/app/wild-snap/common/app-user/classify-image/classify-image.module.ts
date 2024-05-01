import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassifyImageRoutingModule } from './classify-image-routing.module';
import { ClassifyImageComponent } from './classify-image.component';
import { ClassifyImageAddComponent } from './component/classify-image-add/classify-image-add.component';
import { ClassifyImageListComponent } from './component/classify-image-list/classify-image-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonLayoutModule } from 'src/app/common/common-layout.module';
import { MaterialCustomModule } from 'src/app/material-custom/material-custom.module';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    ClassifyImageComponent,
    ClassifyImageAddComponent,
    ClassifyImageListComponent
  ],
  imports: [
    CommonModule,
    ClassifyImageRoutingModule,
    SharedModule,
    CommonLayoutModule,
    MaterialCustomModule,
    MessagesModule,
  ]
})
export class ClassifyImageModule { }
