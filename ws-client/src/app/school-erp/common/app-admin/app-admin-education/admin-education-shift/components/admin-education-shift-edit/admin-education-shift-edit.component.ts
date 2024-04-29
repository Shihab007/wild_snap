import { Component, OnInit } from '@angular/core';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { Header } from 'src/app/common/request/base-request';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { EducationShift } from 'src/app/school-erp/common/shared/model/education/education-shift';
import { EducationShiftByOidRequest } from 'src/app/school-erp/common/shared/request/education/education-shift-by-oid-request ';
import { EducationShiftByOidRequestBody } from 'src/app/school-erp/common/shared/request/education/education-shift-list-request-body copy';
import { EducationShiftListService } from 'src/app/school-erp/common/shared/services/education/education-shift-list.service';

@Component({
  selector: 'app-admin-education-shift-edit',
  templateUrl: './admin-education-shift-edit.component.html',
  styleUrls: ['./admin-education-shift-edit.component.scss']
})
export class AdminEducationShiftEditComponent implements OnInit {


  public entity: EducationShift = new EducationShift();
  public locale: any;
  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();
  public educationShiftRequest: EducationShiftByOidRequest = new EducationShiftByOidRequest();
  public educationShiftRequestBody: EducationShiftByOidRequestBody = new EducationShiftByOidRequestBody();

  constructor(
    private educationShiftService: EducationShiftListService,
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStudentProfileInfo();
  }

  getStudentProfileInfo() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;
    this.educationShiftRequest.header = this.requestHeader;
    this.educationShiftRequestBody.oid = this.route.snapshot.params["oid"];

    this.educationShiftRequest.body = this.educationShiftRequestBody;

    // this.studentProfileRequest.body.studentId = this.userInfo.studentId;
    // console.log('This is Request');
    // console.log(this.studentProfileRequest);
    // console.log('This is Request End');
    this.educationShiftService.getAllEducationShift(this.educationShiftRequest).subscribe(data => {
      console.log('Education Shift response');
      console.log(data.body);
      // console.log('student profile response end');
      if (data.body != null) {
        this.entity = data.body.shift;

      }

      console.log(this.entity);
    },
      (error) => {
        console.log(error);
      });
  }



}
