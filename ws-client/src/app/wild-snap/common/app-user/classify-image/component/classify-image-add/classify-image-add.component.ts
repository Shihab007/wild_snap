import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Header } from 'src/app/common/request/base-request';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';

import { NgxImageCompressService } from 'ngx-alldone-image-compress';
import { UploadedImage } from '../../model/uploaded-image';
import { UploadImageService } from '../../service/upload-image.service';
import { ImageUploadResponse } from '../../service/imageUploadResponse';
import { ClassifyImageAddRequest } from '../../model/request/classify-image-add-request';
import { ClassifyImageAddRequestBody } from '../../model/request/classify-image-add-request-body';
import { ClassifyImageAddResponse } from '../../model/response/classify-image-add-response';
import { ClassifyImageAddResponseBody } from '../../model/response/classify-image-add-response-body';
import { Router } from '@angular/router';
import { Helper } from '../helper/helper';

@Component({
  selector: 'app-classify-image-add',
  templateUrl: './classify-image-add.component.html',
  styleUrls: ['./classify-image-add.component.scss']
})
export class ClassifyImageAddComponent implements OnInit {

  public locale: any;

  public uploadedImage: UploadedImage = new UploadedImage();
  public imageUploadResponse: ImageUploadResponse = new ImageUploadResponse();

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private imageCompress: NgxImageCompressService,
    private imageUploadService: UploadImageService,
    private _router: Router,
    private helper : Helper
  ) { }



  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });
  }



  public header: Header = new Header();
  public classifyImageAddRequest : ClassifyImageAddRequest = new ClassifyImageAddRequest();
  public classifyImageAddRequestBody : ClassifyImageAddRequestBody = new ClassifyImageAddRequestBody();
  public classifyImageAddResponse : ClassifyImageAddResponse = new ClassifyImageAddResponse();
  public classifyImageAddResponseBody : ClassifyImageAddResponseBody = new ClassifyImageAddResponseBody();

  onSubmit() {
    if (!this.isValidData()) {
      return;
    }

   
    this.classifyImageAddRequest.header = this.header;
    this.classifyImageAddRequest.body = this.uploadedImage;
    

    if (this.uploadedImage != null) {
      this.imageUploadService.saveClassifyImage(this.classifyImageAddRequest).subscribe(resData => {
        if (resData.header.responseCode == '200') {
          this.helper.setData(this.uploadedImage.imageUrl)
          this._router.navigate(['/wild-snap/classify-image/prediction']);
        }
      });
    }

  }


  isValidData() {

    if (! this.uploadedImage.imageUrl) {
      this.toastr.error('Please Select Image');
      return false;
    }
   
    return true;
  }




  public url: any;
  public imageSet: string;
  public applicantPhoto: any = File;

  onSelect(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      this.applicantPhoto = file;

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
        this.fileUpload();
      }
    }
  }

  fileUpload() {
    const formData = new FormData();
    formData.append('file', this.applicantPhoto)

    this.imageUploadService.uploadImage(formData).subscribe((data) => {
      this.imageUploadResponse = data;
      this.uploadedImage.imageUrl = environment.uploadImageUrl + data.name;
      this.uploadedImage.imagePath = data.url + "/" + data.name;
    }, (error) => console.log(error));
  }

}
