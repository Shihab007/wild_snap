import { ResponseHeader } from "../../header/response-header";
import { SmsServiceModel } from "../../model/sms/sms-service-model";

export class GetSmsServiceByOidResponse {
  header: ResponseHeader;
  body: SmsServiceModel;
}
