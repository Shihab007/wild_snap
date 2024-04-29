import { MessageScheduleDetail } from "../../model/notification-message/message-schedule-detail";

export class GetMessageScheduleByOidResponseBody {

  oid: string;
  scheduleId: string;
  nameEn: string;
  nameBn: string;
  remarks: string;
  scheduleType: string;
  scheduleMode: string;
  scheduleTime: Date;
  startDate: string;
  endDate: string;
  messageTemplateOid: string;
  messageLanguage: string;
  instituteOid: string;
  status: string;
  createdBy: string;
  scheduletemplateNameEn: string;
  scheduletemplateNameBn: string;
  scheduletemplateTextEn: string;
  scheduletemplateTextBn: string;

  messageScheduleDetailList: MessageScheduleDetail[];
}
