import { ResponseHeader } from "../../header/response-header";
import { GetSmsServiceLogListResponseBody } from "./get-sms-service-log-list-response-body";

export class GetSmsServiceLogListResponse {
  header: ResponseHeader;
  body: GetSmsServiceLogListResponseBody;
}
