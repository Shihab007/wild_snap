import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '../helper/helper';
import { Location } from '@angular/common';

@Component({
  selector: 'app-classify-image-prediction',
  templateUrl: './classify-image-prediction.component.html',
  styleUrls: ['./classify-image-prediction.component.scss']
})
export class ClassifyImagePredictionComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private helper : Helper,
    private _location: Location,
  ) { }
  
  url:string;
  predictionTittle:string;

  ngOnInit(): void {
    this.url = this.helper.getData();
    this.predictionTittle= "Cat"
    
    console.log(this.helper.getData());
    console.log("Hello "+this.url);
    
    
  }


  goBack(){
    this._location.back();
  }
}
