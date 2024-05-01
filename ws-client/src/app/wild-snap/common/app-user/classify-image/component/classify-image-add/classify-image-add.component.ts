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
    private imageUploadService: UploadImageService
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

  public oidList: string[] = [];
  public bookList: string[] = [];
  public idList: string[] = [];
  public codeList: string[] = [];
  public bookTypeList: string[] = [];


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

    console.log(this.classifyImageAddRequest);
    

    if (this.uploadedImage != null) {
      this.imageUploadService.saveClassifyImage(this.classifyImageAddRequest).subscribe(resData => {
        if (resData.header.responseCode == '200') {
          
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
