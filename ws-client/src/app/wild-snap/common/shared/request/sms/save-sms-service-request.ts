import { RequestHeader } from "../../header/request-header";
import { SmsServiceModel } from "../../model/sms/sms-service-model";
import { SaveSmsServiceRequestBody } from "./save-sms-service-request-body";

export class SaveSmsServiceRequest {
  header: RequestHeader;
  body: SaveSmsServiceRequestBody;
}
