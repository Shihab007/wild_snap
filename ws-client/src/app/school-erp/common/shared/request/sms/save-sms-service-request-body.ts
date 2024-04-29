import { SmsServiceModel } from "../../model/sms/sms-service-model";

export class SaveSmsServiceRequestBody {
  instituteOid: string;
  smsServiceList: SmsServiceModel[];

}
