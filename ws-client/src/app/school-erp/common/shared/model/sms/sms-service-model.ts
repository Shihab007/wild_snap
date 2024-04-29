import { TemplateParameter } from "../notification-message/template-parameter";
import { SmsServiceContactGroup } from "./sms-service-contact-group";
import { SmsServiceLog } from "./sms-service-log";

export class SmsServiceModel {

  oid: string;
  nameEn: string;
  nameBn: string;
  smsTemplateName: string;
  smsTemplateTextEn: string;
  smsTemplateTextBn: string;
  smsLanguage: string;
  smsPush: string;
  emailSubject: string;
  emailTemplateTextEn: string;
  emailTemplateTextBn: string;
  emailLanguage: string;
  emailPush: string;
  contactGroupSmsPush: string;
  contactGroupEmailPush: string;
  applicableFor: string;
  remarks: string;
  status: string;
  smsFeatureOid: string;
  smsServiceLogOid: string;
  instituteOid: string;
  updatedBy: string;
  messageParameterJson: string;

  smsServiceLog: SmsServiceLog;

  contactGroupList: SmsServiceContactGroup[];

}
