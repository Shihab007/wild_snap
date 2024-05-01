import { RequestHeader } from "../../header/request-header";
import { SmsFeatureModel } from "../../model/sms/sms-feature-model";

export class SmsFeatureRequest {
  header: RequestHeader;
  body: SmsFeatureModel;
}
