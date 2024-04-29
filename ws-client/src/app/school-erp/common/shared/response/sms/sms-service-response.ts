import { ResponseHeader } from "../../header/response-header";
import { SmsServiceResponseBody } from "./sms-service-response-body";

export class SmsServiceResponse {
  header: ResponseHeader;
  body: SmsServiceResponseBody;
}
