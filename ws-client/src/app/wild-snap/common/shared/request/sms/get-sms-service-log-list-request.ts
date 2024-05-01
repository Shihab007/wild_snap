import { RequestHeader } from "../../header/request-header";
import { GetSmsServiceLogListRequestBody } from "./get-sms-service-log-list-request-body";

export class GetSmsServiceLogListRequest {
  header: RequestHeader;
  body: GetSmsServiceLogListRequestBody;
}
