import { RequestHeader } from "../../header/request-header";
import { InstituteClassSetting } from "../../model/class-setting/class-setting";

export class ClassSettingEditRequest {

  header: RequestHeader;
  body: InstituteClassSetting;
}
