import { ResponseHeader } from "../../header/response-header";
import { SmsServiceLogList } from "../../model/sms/sms-service-log-list";
import { GetSmsServiceLogByOidResponseBody } from "./get-sms-service-log-by-oid-response-body";

export class GetSmsServiceLogByOidResponse {
  header: ResponseHeader;
  body: GetSmsServiceLogByOidResponseBody;
}
