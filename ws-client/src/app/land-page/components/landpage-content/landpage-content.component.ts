import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstantService } from 'src/app/common/services/constant.service';
import { NgxSpinnerConfiguration } from 'src/app/wild-snap/common/shared/model/ngx-spinner-configuration';

@Component({
  selector: 'app-landpage-content',
  templateUrl: './landpage-content.component.html',
  styleUrls: ['./landpage-content.component.scss']
})
export class LandpageContentComponent implements OnInit {
  public spinnerConfig: NgxSpinnerConfiguration = new NgxSpinnerConfiguration();
  // slides = [{'image': '../../../../assets/img/user.jpg'}, {'image': '../../../assets/img/myacademy.png'}, {'image': '../../../assets/img/myacademy.png'}, {'image': '../../../assets/img/myacademy.png'}];

  constructor(
    private _spinner: NgxSpinnerService,
    private _constantService: ConstantService
  ) {
    this.spinnerConfig = this._constantService.getNgxSpinnerConfiguration();
  }

  ngOnInit() {
    this._spinner.show();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._spinner.hide();
    }, 300);
  }



}
