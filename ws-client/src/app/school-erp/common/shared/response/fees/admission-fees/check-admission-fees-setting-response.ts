import { ResponseHeader } from "../../../header/response-header";
import { CheckAdmissionFeesSettingResponseBody } from "./check-admission-fees-setting-response-body";

export class CheckAdmissionFeesSettingResponse {
  header: ResponseHeader;
  body: CheckAdmissionFeesSettingResponseBody;
}
