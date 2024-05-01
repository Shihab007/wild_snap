import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifyImageComponent } from './classify-image.component';
import { ClassifyImageAddComponent } from './component/classify-image-add/classify-image-add.component';
import { ClassifyImageListComponent } from './component/classify-image-list/classify-image-list.component';
import { ClassifyImagePredictionComponent } from './component/classify-image-prediction/classify-image-prediction.component';

const routes: Routes = [
  {
    path: '',
    component: ClassifyImageComponent,
  },
  {
    path: 'add',
    component: ClassifyImageAddComponent,
  },
  {
    path: 'list',
    component: ClassifyImageListComponent,
  },
  {
    path: 'prediction',
    component: ClassifyImagePredictionComponent,

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifyImageRoutingModule { }
