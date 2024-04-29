import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, Location } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { USER_INFO_LOCAL_STORAGE_KEY } from 'src/app/common/constant/constant';
import { Header } from 'src/app/common/request/base-request';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { InstituteClassEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-entity';
import { InstituteClassGroupEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-group-entity';
import { InstituteClassSectionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-class-section-entity';
import { InstituteSessionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-session-entity';
import { InstituteShiftEntity } from 'src/app/school-erp/common/shared/model/institute/institute-shift-entity';
import { InstituteVersionEntity } from 'src/app/school-erp/common/shared/model/institute/institute-version-entity';
import { TemplateParameter } from 'src/app/school-erp/common/shared/model/notification-message/template-parameter';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { ContactService } from 'src/app/school-erp/common/shared/services/contact/contact.service';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';

@Component({
  selector: 'app-admin-sms-parameter-list-dialog',
  templateUrl: './admin-sms-parameter-list-dialog.component.html',
  styleUrls: ['./admin-sms-parameter-list-dialog.component.scss']
})
export class AdminSmsParameterListDialogComponent implements OnInit {


  public allParameterList: TemplateParameter[] = [];
  public selectedParameterList: TemplateParameter[] = [];

  shiftList: InstituteShiftEntity[] = [];
  classList: InstituteClassEntity[] = [];
  sessionList: InstituteSessionEntity[] = [];
  versionList: InstituteVersionEntity[] = [];
  groupList: InstituteClassGroupEntity[] = [];
  sectionList: InstituteClassSectionEntity[] = [];

  getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<TemplateParameter>();



  public userInfo: UserInfo = new UserInfo();
  displayedColumns: string[] = ['serialNumber', 'name', 'contactNo', 'email', 'actions'];
  pipe: DatePipe;
  requisitionSubscription: Subscription;
  msgs: Message[] = [];
  param: any;
  public locale: any;

  constructor(
    public dialogRef: MatDialogRef<AdminSmsParameterListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService,
    private router: Router,
    private _location: Location,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _appStorageService: AppStorageService,
    private instituteService: InstituteService,
    private contactService: ContactService
  ) { }

  header: Header = new Header();

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
    this.allParameterList = this.data.allParameterList;
    this.selectedParameterList = this.data.selectedParameterList;

    this.allParameterList.map(res => {
      var check = this.selectedParameterList.find(x => x.oid == res.oid);
      if (check)
        res.check = true;
      else
        res.check = false;
    });


  }

  contactTypeModel: any;
  contactTypeFilter = new FormControl('');
  selectAllStudent: boolean
  selectAll: boolean
  selectAllCheckbox(selectAll: boolean) {

    if (selectAll) {
      this.dataSource.data.map(res => {
        res.check = true;
        this.selectAllStudent = true;
      })
    } else {
      this.dataSource.data.map(res => {
        res.check = false;
        this.selectAllStudent = false;
      })
    }
  }



  public tempParameterList: TemplateParameter[] = [];
  // public contact: TemplateParameter;
  apply() {
    this.tempParameterList = [];
    this.dataSource.data.map(res => {
      if (res.check) {
        let parameter = new TemplateParameter();
        parameter.oid = res.oid;
        parameter.nameEn = res.nameEn;
        parameter.nameBn = res.nameBn;
        parameter.parameterValue = res.parameterValue;
        parameter.parameterId = res.parameterId;
        parameter.isGeneral = res.isGeneral;
        parameter.isSchedule = res.isSchedule;
        parameter.remarks = res.remarks;
        parameter.createdBy = res.status;
        parameter.createdBy = res.createdBy;

        this.tempParameterList.push(parameter);
      }
    });
    this.dialogRef.close(this.tempParameterList);
  }



  cancel() {
    this.dialogRef.close('No');
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;


    this.dataSource.data = this.allParameterList;

  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
    // this.dataSourceStudent.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


}
