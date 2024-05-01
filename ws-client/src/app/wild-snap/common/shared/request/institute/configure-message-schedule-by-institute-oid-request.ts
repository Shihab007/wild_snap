import { Header } from "src/app/common/request/base-request";
import { ConfigureMessageScheduleByInstituteOidRequestBody } from "./configure-message-schedule-by-institute-oid-request-body";

export class ConfigureMessageScheduleByInstituteOidRequest {
  header: Header = new Header();
  body: ConfigureMessageScheduleByInstituteOidRequestBody;
}
