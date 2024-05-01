import { ResponseHeader } from "../../header/response-header";
import { GetSmsServiceListResponseBody } from "./get-sms-service-list-response-body";

export class GetSmsServiceListResponse {
  header: ResponseHeader;
  body: GetSmsServiceListResponseBody;
}
