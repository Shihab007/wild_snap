import { RequestHeader } from "../../header/request-header";
import { SmsServiceModel } from "../../model/sms/sms-service-model";

export class SmsServiceRequest {
  header: RequestHeader;
  body: SmsServiceModel;
}
