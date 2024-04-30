
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppStorageService } from 'src/app/login/auth/app-storage.service';
import { AuthService } from 'src/app/login/auth/auth.service';
import { UserInfo } from 'src/app/login/shared/model/user-info';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';
import { GetInstituteInfoRequest } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request';
import { GetInstituteInfoRequestBody } from 'src/app/school-erp/common/shared/request/institute/get-institute-info-request-body';
import { GetInstituteInfoResponseBody } from 'src/app/school-erp/common/shared/response/institute/get-institute-info-response-body';
import { InstituteService } from 'src/app/school-erp/common/shared/services/institute/institute.service';
import { loginCookieStoreKey, USER_INFO_LOCAL_STORAGE_KEY } from '../constant/constant';
import { Header } from '../request/base-request';
import { TitleService } from '../services/title.service';
import { SidebarService } from '../sidebar/sidebar.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  public isShowThird: boolean;
  public isShowOne: boolean = true;
  public isShowSecond: boolean;
  public userInfo: UserInfo = new UserInfo();


  public buttonIconState: boolean;
  title: String;
  public menus: {};

  public userName$: any;
  public roleOid$: any;
  public locale: string;
  public showLanguage: string;
  public LANGUAGE_BANGLA = 'বাংলা';
  public LANGUAGE_ENGLISH = 'English';

  constructor(public sidebarservice: SidebarService,
    private titleService: TitleService,
    private _appStorageService: AppStorageService,
    private translate: TranslateService,
    private instituteService: InstituteService,
    private router: Router,
    private _authService: AuthService) {
    translate.setDefaultLang('en');

    if (this.translate.currentLang === 'bn') {
      this.locale = 'bn';
      this.showLanguage = this.LANGUAGE_ENGLISH;
    } else {
      this.showLanguage = this.LANGUAGE_BANGLA;
      this.locale = 'en';
    }
  }

  changeLangToEnglish() {
    this.translate.use('en');
    this.locale = 'en';
  }
  changeLangToBangla() {
    this.translate.use('bn');
    this.locale = 'bn';
  }

  changeLanguage(lan: string) {
    this.translate.use(lan);
    this.setActiveLanguageLink();
    this.locale = lan;
  }

  setActiveLanguageLink() {
    if (this.translate.currentLang === 'en') {
      $('#englishLangLink').addClass("active");
      $('#banglaLangLink').removeClass("active");
      document.documentElement.setAttribute('lang', 'en');
    }
    else if (this.translate.currentLang === 'bn') {
      $('#banglaLangLink').addClass("active");
      $('#englishLangLink').removeClass("active");
      document.documentElement.setAttribute('lang', 'bn');
    }
  }

  ngOnInit(): void {
    this.buttonIconState = this.sidebarservice.getSidebarState();
    this.locale = 'bn';
    this.titleService.getTitle().subscribe(appTitle => this.title = appTitle);

    this.userInfo = JSON.parse(this._appStorageService.getData(USER_INFO_LOCAL_STORAGE_KEY));

    let menuJson = this._appStorageService.getData(loginCookieStoreKey);

    if (menuJson != null) {
      this.menus = JSON.parse(menuJson);
    }
    this.userName$ = this._authService.currentUserName;
    this.roleOid$ = this._authService.currentRoleOid;
    // this.getInstituteInformation(this.userInfo.instituteOid);
  }


  public header: Header = new Header();
  public requestHeader: RequestHeader = new RequestHeader();
  public getInstituteInfoRequest: GetInstituteInfoRequest = new GetInstituteInfoRequest();
  public getInstituteInfoRequestBody: GetInstituteInfoRequestBody = new GetInstituteInfoRequestBody();
  public instituteInfo: GetInstituteInfoResponseBody = new GetInstituteInfoResponseBody();


  getInstituteInformation(instituteOid: string) {

    this.requestHeader.requestId = this.header.requestId;
    this.requestHeader.requestDateTime = this.header.requestDateTime;
    this.requestHeader.requestSource = this.header.requestSource;
    this.requestHeader.requestServiceSource = this.header.requestServiceSource;

    this.getInstituteInfoRequest.header = this.requestHeader;
    this.getInstituteInfoRequest.body = this.getInstituteInfoRequestBody;
    this.getInstituteInfoRequest.body.oid = instituteOid;

    this.instituteService.getInstituteInfo(this.getInstituteInfoRequest).subscribe((data) => {
      this.instituteInfo = data.body;
      console.log(this.instituteInfo);


    }, (error) => {
      console.log(error);
      // this.toastr.error(error.Message);
    });
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    this.buttonIconState = this.sidebarservice.getSidebarState();
  }
  toggleSidebarThree() {
    this.isShowThird = !this.isShowThird;
    this.isShowOne = !this.isShowOne;
    this.isShowSecond = !this.isShowSecond;
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice
      .hasBackgroundImage;
  }

  ngAfterViewInit() {
    setTimeout(() => this.setActiveLanguageLink());
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  goToProfile() {
    let user = this.userInfo.roleType.toLocaleLowerCase();
    // if (user != 'institute') {
    //   this.router.navigate(["/" + user + "/profile"]);
    // }
    // else {
    //   this.router.navigate(["/wild-snap/profile"]);
    // }
    this.router.navigate(["/wild-snap/profile"]);
  }

  goToInstituteEditPage() {
    let user = this.userInfo.roleType.toLocaleLowerCase();
    if (user == 'institute') {
      // var oid = this.userInfo.instituteOid;
      var routerPath = 'school/institute/edit/';
      // this.router.navigate([routerPath, oid]);
    }

  }

  logout() {
    this.router.navigate(["/login"]);
    // this._authService.logout();
  }

}


