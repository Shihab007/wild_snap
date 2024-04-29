import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { ConstantService } from 'src/app/common/services/constant.service';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { DataList } from 'src/app/school-erp/common/shared/model/common/data-list';
import { ExamResultDetailList } from 'src/app/school-erp/common/shared/model/exam-result/exam-result-detail-list';
import { ExamResultList } from 'src/app/school-erp/common/shared/model/exam-result/exam-result-list';
import { ExamClassResultList } from 'src/app/school-erp/common/shared/model/exam-result/examClassResultList';
import { ExamResultDetailListRequest } from 'src/app/school-erp/common/shared/request/exam-result/exam-result-detail-list-request';
import { ExamResultDetailListRequestBody } from 'src/app/school-erp/common/shared/request/exam-result/exam-result-detail-list-request-body';
import { ExamResultListRequest } from 'src/app/school-erp/common/shared/request/exam-result/exam-result-list-request';
import { ExamResultListRequestBody } from 'src/app/school-erp/common/shared/request/exam-result/exam-result-list-request-body';
import { ExamResultPublishRequest } from 'src/app/school-erp/common/shared/request/exam-result/exam-result-publish-request';
import { ExamResultPublishRequestBody } from 'src/app/school-erp/common/shared/request/exam-result/exam-result-publish-request-body';
import { ExamResultPublishResponseBody } from 'src/app/school-erp/common/shared/response/exam-result/exam-result-publish-response-body';
import { ExamResultService } from 'src/app/school-erp/common/shared/services/exam-result/exam-result.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-school-exam-result-view',
  templateUrl: './school-exam-result-view.component.html',
  styleUrls: ['./school-exam-result-view.component.scss']
})
export class SchoolExamResultViewComponent implements OnInit {
  public locale: any;
  public header: Header = new Header();
  public userInfo: UserInfo = new UserInfo();
  public entity = { examOid: null, classOid: null, versionOid: null, textBookOid: null, totalMarks: null, shiftOid: null, sectionOid: null };
  public examResultListRequest: ExamResultListRequest = new ExamResultListRequest();
  public examResultListRequestBody: ExamResultListRequestBody = new ExamResultListRequestBody();
  public examResultList: ExamResultList[];
  public requestHeader: RequestHeader = new RequestHeader();
  public examResultDetailListRequest: ExamResultDetailListRequest = new ExamResultDetailListRequest();
  public examResultDetailListRequestBody: ExamResultDetailListRequestBody = new ExamResultDetailListRequestBody();

  public examResultPublishRequest: ExamResultPublishRequest = new ExamResultPublishRequest();
  public examResultPublishRequestBody: ExamResultPublishRequestBody = new ExamResultPublishRequestBody();

  public examResultPublishResponseBody: ExamResultPublishResponseBody = new ExamResultPublishResponseBody();


  examClassResultList: ExamClassResultList[];
  examResultDetailList: ExamResultDetailList[];

  constructor(
    private _appStorageService: AppStorageService,
    private _translate: TranslateService,
    private _location: Location,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private examResultService: ExamResultService,
    private constantService: ConstantService
  ) { }


  ngOnInit(): void {
    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));
    this.locale = this._translate.currentLang;
    this._translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === 'en') {
        this.locale = 'en';
      } else {
        this.locale = 'bn';
      }
    });
    this.entity.examOid = this._route.snapshot.params["oid"];

    this.getExamResultList();
  }

  getExamResultList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.examResultListRequest.header = this.requestHeader;
    this.examResultListRequest.body = this.examResultListRequestBody;
    this.examResultListRequest.body.instituteOid = this.userInfo.instituteOid;

    this.examResultService
      .getExamResultList(this.examResultListRequest)
      .subscribe((data) => {
        this.examResultList = data.body.examResultList;

        this.getResultDetailsByOid();
      },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getResultDetailsByOid() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.examResultDetailListRequestBody.examOid = this.entity.examOid;


    this.examResultDetailListRequest.header = this.requestHeader;
    this.examResultDetailListRequest.body = this.examResultDetailListRequestBody;

    this.examResultService
      .getExamResultDetailList(this.examResultDetailListRequest)
      .subscribe((data) => {
        console.log("Exam Result Detail List Response : ");
        this.examResultDetailList = data.body.examResultList;
        console.log(this.examResultDetailList);
        console.log("Exam Result Detail List Response End ");

        this.examClassResultList = [];
        this.examResultDetailList.filter((value, index, arr) => {
          return index === arr.findIndex(obj => obj.instituteClassOid === value.instituteClassOid);
        }).forEach((examObj) => {
          var obj: ExamClassResultList = new ExamClassResultList();
          obj.instituteClassOid = examObj.instituteClassOid;
          obj.classNameEn = examObj.classNameEn;
          obj.classNameBn = examObj.classNameBn;
          obj.examResultDetailList = [];
          obj.examResultDetailList = _.where(this.examResultDetailList, { instituteClassOid: examObj.instituteClassOid })
          this.examClassResultList.push(obj);
        });
        console.log("Exam Class Result List");
        console.log(this.examClassResultList);
        console.log("Exam Class Result List End");
      },
        (error: any) => {
          console.log(error);
        }
      );
  }

  examResultPublish(instituteClassOid, classSectionOid) {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.examResultPublishRequest.header = this.requestHeader;
    this.examResultPublishRequest.body = this.examResultPublishRequestBody;
    this.examResultPublishRequest.body.examOid = this.entity.examOid;
    if (!this.constantService.isNullOrEmpty(instituteClassOid)) {
      this.examResultPublishRequest.body.instituteClassOid = instituteClassOid;
    }
    if (!this.constantService.isNullOrEmpty(classSectionOid)) {
      this.examResultPublishRequest.body.classSectionOid = classSectionOid;
    }
    this.examResultPublishRequest.body.updatedBy = this.userInfo.loginId;
    this.examResultPublishRequest.body.instituteOid = this.userInfo.instituteOid;
    this.examResultPublishRequest.body.status = "Published";

    this.examResultService
      .examResultPublish(this.examResultPublishRequest)
      .subscribe((data) => {
        this.examResultPublishResponseBody = data.body;
        this.toastr.success('Publish Result Successfully');
        this.router.navigate(['/school/exam-result/list']);
      },
        (error: any) => {
          console.log(error);
        }
      );
  }

  goBack() {
    this._location.back();
  }

}
