export class RegConstant {
}
import { HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef, inject, ViewRef } from "@angular/core";
// import { TableColumn } from "@app/utility/utils";
import { Observable, ReplaySubject, UnaryFunction } from "rxjs";

export const CONTENT_TYPE = "application/json";
export const REQUEST_TIMEOUT_IN_SECONDS = "30";
// export const NID_REGEX = /^(\d{10}|\d{13}|\d{17})$/;
export const NidNoRegEx = "^([0-9]{10}|[0-9]{13}|[0-9]{17})$";
export const PassportNoRegEx = "^(?!^0+$)[a-zA-Z0-9]{3,20}$";
export const BirthRegNoRegEx = "^([0-9]{17})$";
export const StudentRegistrationNoRegEx = "^([0-9]{10})$";
export const DrivngLicenceNoRegEx = "^(?!^0+$)[a-zA-Z0-9]{3,20}$";
export const AUTH_STORE_KEY = "accesstoken.ims.cookie.store.key";
export const MENU_JSON = "ecourier.menujson.cookie.store.key";
export const USER_INFO_LOCAL_STORAGE_KEY =
  "mraims.login.user.info.local.storage.key";
export const MRAIMS_LOCAL_STORAGE_INFO_KEY =
  "mraims.local.storage.info.key";
export const REGISTRATION_REF_ID = "registrationRefId";
export const OTP_EXPIRES_AT = "otpExpiresAt";
export const USER_ID = "userId";
export const PASSWORD = "password";
export const SAVE_ID = "saveId";
export const REF_ID = "refId";
export const OTP_KEY = "otpKey";
export const REGEX_EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9.-]{1,}$/;
export const CUSTOMER_ID_REGEX = /[0-9]{8}/;
export const ACCOUNT_NO_REGEX = /^([0-9\-]{14}|[0-9\-]{15})$/;
// export const MOBILE_NO_REGEX = /^((01[3-9]{1})[0-9]{8})$/;
export const MOBILE_NO_REGEX_V2 = /^(?:\+?88|0088)?01[3-9]\d{8}$/;
// export const PASS_REGEX = /^([\w\W]{8})/;
export const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9.-]{2,4}$/;
export const MOBILE_NO_REGEX = /^(?:\+?88|0088)?01[3-9]\d{8}$/;
export const LATTITUDE_REGEX = /^-?([0-8]?\d(\.\d{1,6})?|90(\.0{1,6})?)$/;
export const LONGITUDE_REGEX = /^-?((180(\.0{1,6})?)|((1[0-7]\d)|(\d{1,2}(\.\d{1,6})?)))$/;
export const DECIMAL_NUMBER_REGEX = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
export const TELEPHONE_NO_REGEX =
  /^((?:\+?88|0088)?0[1-9](\d{7}|\d{8}|\d{9}|\d{10}|\d{11}))$/;
export const DEFAULT_OFFSET = 0;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_PHOTO_SIZE_LIMIT = 600;
export const DEFAULT_FILE_SIZE_LIMIT = 5120;
export const STATUS_ACTIVE = "Active";
export const STATUS_INACTIVE = "Inactive";
export const STATUS_REJECTED = "Rejected";
export const STATUS_APPROVED = "Approved";
export const STATUS_PENDING_APPROVAL = "Pending-Approval";
export const JOURNAL_TYPE_MANUAL = "Manual";

export const DATABASE_DATE_FORMAT = "YYYY-MM-DD";
export const UI_FORM_DATE_FORMAT = "YYYY-MMM-DD";
export const VIEW_FULL_DATE_FORMAT = "Do MMMM, YYYY";

export const WEEKLY_REPAYMENT_FEQUENCY = 52;
export const FORTNIGHT_REPAYMENT_FEQUENCY = 26;
export const MONTHLY_REPAYMENT_FEQUENCY = 12;
export const BIMONTHLY_REPAYMENT_FEQUENCY = 6;
export const QUARTERLY_REPAYMENT_FEQUENCY = 4;
export const FOUR_MONTHLY_REPAYMENT_FEQUENCY = 3;
export const HALF_YEARLY_REPAYMENT_FEQUENCY = 2;
export const YEARLY_REPAYMENT_FEQUENCY = 1;
export const SINGLE_REPAYMENT_FEQUENCY = 1;

export const MIN_LOAN_AMOUNT = 1;
export const MAX_LOAN_AMOUNT = 2500000;

export const SEARCH_BOX_KEY = "Search_Box_Key";


export const BACK_BUTTON_COLOR = "rgb(235 235 235)";
export const BACK_BUTTON_ICON = "fas fa-arrow-left";
export const SAVE_BUTTON_ICON = "far fa-save";
export const EDIT_BUTTON_ICON = "far fa-edit";
export const GO_BUTTON_ICON = "far fa-edit";

//LOAN RELATED CONSTANT

export const COLLECTION_TYPE_REGULAR = "Regular";
export const COLLECTION_TYPE_SPECIAL = "Special";
export const DIVIDER_SIGN = " -> ";



export const ICON_PATH_PREFIX = "./../../../../assets/icons/list-icons/";

export const UNLOCK_TYPE_OR_MODAL_ID = "unlock";
export function getHttpHeaders(): HttpHeaders {
  return new HttpHeaders()
    .set("content-type", CONTENT_TYPE)
    .set("accept", CONTENT_TYPE);
}


export const REGULAR_SAVINGS = "VS";
export const GENERAL_SAVINGS = "GS";
export const DEPOSIT_SCHEME = "DPS";
export const FIXED_DEPOSIT = "FDR";

export const ROLL_REGEX = /^-?(0|[1-9]\d*)?$/;
export const NAME_REGEX = /^[A-Za-z .]{3,80}$/;
export const ENGLISH_REGEX = /^[A-Za-z .]{1,50}$/;
export const BANGLA_REGEX = /[ঀ-৿\s:]*/;
export const NUMBER_REGEX = /^-?(0|[1-9]\d*)?$/;
export const POST_CODE_REGEX = /[0-5]/;
export const AMOUNT_REGEX = /^[0-9]+$/;
export const SECTION_NAME_REGEX = /^[A-Za-z .]{1,30}$/;

// export const DATE_FORMAT_REGEX_EXCEL = /^(0[1-9]|[1-2][0-9]|3[0-1])[-\/](0[1-9]|1[0-2])[-\/]\d{4}$/;
export const DATE_FORMAT_REGEX_EXCEL = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

export const GENDER_REXGX = /^(male|female|non-binary)$/i;
export const BOOLEAD_GROUP_REXGX = /^(A|B|AB|O)[+-]$/;

export const NOT_NULL_REXGX = /\S/;




export const Alpha_Bn_Numeric_With_Space_And_Length = /^(?=.*[ঀ-৿0-9])[ঀ-৿0-9\s]{0,60}(?:\s\d{4})?$/;
export const Alpha_En_Numeric_With_Space_And_Length = /^(?=.*[A-Za-z0-9])[A-Za-z0-9\s]{0,60}(?:\s\d{4})?$/;
export const Payment_Amount = /^(?:[1-9]\d{0,15}|0)$/;
export const Numeric_Mark = /^(?:[1-9]\d{0,15}|0)$/;
export const Grading_Letter = /^[A-Za-z .+-]{2,30}$/;
