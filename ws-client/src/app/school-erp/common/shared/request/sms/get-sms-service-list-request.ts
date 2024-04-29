import { RequestHeader } from "../../header/request-header";
import { GetSmsServiceListRequestBody } from "./get-sms-service-list-request-body";

export class GetSmsServiceListRequest {
  header: RequestHeader;
  body: GetSmsServiceListRequestBody;
}
