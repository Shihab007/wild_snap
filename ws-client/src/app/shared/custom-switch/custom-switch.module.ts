import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSwitchComponent } from './custom-switch.component';



@NgModule({
  declarations: [CustomSwitchComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CustomSwitchComponent
  ]
})
export class CustomSwitchModule { }
