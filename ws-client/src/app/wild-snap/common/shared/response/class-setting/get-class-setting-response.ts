import { ResponseHeader } from "../../header/response-header";
import { InstituteClassSetting } from "../../model/class-setting/class-setting";
import { GetClassSettingResponseBody } from "./get-class-setting-response-body";

export class GetClassSettingResponse {

  header: ResponseHeader;
  body: InstituteClassSetting;
}
