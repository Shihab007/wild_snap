import { ResponseHeader } from "../../header/response-header";
import { SmsFeatureModel } from "../../model/sms/sms-feature-model";

export class GetSmsFeatureByOidResponse {
  header: ResponseHeader;
  body: SmsFeatureModel;
}
