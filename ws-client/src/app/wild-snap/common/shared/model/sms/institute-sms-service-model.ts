import { InstituteList } from "../institute/institute-list";
import { TemplateParameter } from "../notification-message/template-parameter";
import { SmsServiceContactGroup } from "./sms-service-contact-group";
import { SmsServiceLog } from "./sms-service-log";
import { SmsServiceModel } from "./sms-service-model";

export class InstituteSmsServiceModel {

  smsServicePendingRequest: number;
  smsServiceOff: number;
  smsServiceOn: number;

  emailServiceOff: number;
  emailServiceOn: number;

  totalSmsService: number;
  totalInstituteSmsService: number;

  smsServiceList: SmsServiceModel[];
  institute: InstituteList;

}
