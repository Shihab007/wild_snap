import { RequestHeader } from "../../header/request-header";
import { GetClassSettingRequestBody } from "./get-class-setting-request-body";

export class GetClassSettingRequest {

  header: RequestHeader;
  body: GetClassSettingRequestBody;
}
