import { Header } from "src/app/common/request/base-request";
import { CheckAdmissionFeesSettingRequestBody } from "./check-admission-fees-setting-request-body";

export class CheckAdmissionFeesSettingRequest {
  header: Header = new Header();
  body: CheckAdmissionFeesSettingRequestBody;
}
