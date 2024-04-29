
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/common/request/base-request';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { ResponseHeader } from 'src/app/school-erp/common/shared/header/response-header';
import { GetAllEducationShiftListV1Request } from 'src/app/school-erp/common/shared/request/education/get-all-education-shift-list-request';
import { GetAllEducationShiftListV1RequestBody } from 'src/app/school-erp/common/shared/request/education/get-all-education-shift-list-request-body';
import { GetAllEducationShiftListV1Response } from 'src/app/school-erp/common/shared/response/education/get-all-education-shift-list-response';
import { GetAllEducationShiftListV1ResponseBody } from 'src/app/school-erp/common/shared/response/education/get-all-education-shift-list-response-body';
import { EducationShift } from 'src/app/school-erp/common/shared/model/education/education-shift';
import { EducationShiftListService } from 'src/app/school-erp/common/shared/services/education/education-shift-list.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-education-shift-list',
  templateUrl: './admin-education-shift-list.component.html',
  styleUrls: ['./admin-education-shift-list.component.scss']
})
export class AdminEducationShiftListComponent implements OnInit {



  public locale: any;


  constructor(
    private educationShiftService: EducationShiftListService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {

    this.locale = this.translate.currentLang;
    this.translate.onLangChange.subscribe((s: { lang: string }) => {
      if (s.lang === "en") {
        this.locale = "en";
      } else {
        this.locale = "bn";
      }
    });
    this.getEducationShiftList();
  }

  header: Header = new Header();

  request: GetAllEducationShiftListV1Request = new GetAllEducationShiftListV1Request;
  requestHeader: RequestHeader = new RequestHeader;

  requestBody: GetAllEducationShiftListV1RequestBody = new GetAllEducationShiftListV1RequestBody;


  response: GetAllEducationShiftListV1Response = new GetAllEducationShiftListV1Response;
  responseHeader: ResponseHeader = new ResponseHeader;
  responseBody: GetAllEducationShiftListV1ResponseBody = new GetAllEducationShiftListV1ResponseBody;
  classFilter: any;

  dataSource = new MatTableDataSource<EducationShift>();
  selection = new SelectionModel<EducationShift>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNo', 'nameEnglish', 'nameBangla', 'status', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];



  goToAddShift() {
    var routerPath = 'admin/education/shift/add';
    this.router.navigate([routerPath]);
  }


  editShiftInfo(obj: any) {
    console.log("shift object :");
    console.log(obj);
    var routerPath = 'admin/education/shift/edit/';
    var oid = obj.oid;
    var all = obj;

    //console.log(obj);
    this.router.navigate([routerPath]);//, oid
    this.toastr.success('Shift information loaded successfully');
  }

  viewShiftInfo(obj: any) {
    console.log("shift object :");
    console.log(obj);
    var routerPath = 'admin/education/shift/view/';
    var oid = obj.oid;
    var all = obj;

    //console.log(obj);
    this.router.navigate([routerPath, oid]);//
    this.toastr.success('Shift information loaded successfully');
  }
  getEducationShiftList() {
    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.request.header = this.requestHeader;
    this.request.body = this.requestBody;


    console.log("Shift list loaded");

    console.log(this.request);

    this.educationShiftService.getAllEducationShiftList(this.request).subscribe(data => {
      console.log('education Shift list')
      console.log(data.body);
      console.log(data.body.list);
      this.dataSource.data = data.body.list;
    });
  }
}
