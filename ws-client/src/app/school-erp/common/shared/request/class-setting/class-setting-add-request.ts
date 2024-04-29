import { RequestHeader } from "../../header/request-header";
import { InstituteClassSetting } from "../../model/class-setting/class-setting";

export class ClassSettingAddRequest {

  header: RequestHeader;
  body: InstituteClassSetting;
}
