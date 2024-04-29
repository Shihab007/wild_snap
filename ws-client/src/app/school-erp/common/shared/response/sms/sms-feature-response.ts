import { ResponseHeader } from "../../header/response-header";
import { SmsFeatureResponseBody } from "./sms-feature-response-body";

export class SmsFeatureResponse {
  header: ResponseHeader;
  body: SmsFeatureResponseBody;
}
