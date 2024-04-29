import { MessageScheduleDetail } from "../../model/notification-message/message-schedule-detail";

export class SaveMessageScheduleRequestBody {
  oid: string;
  scheduleId: string;
  nameEn: string;
  nameBn: string;
  remarks: string;
  scheduleType: string;
  scheduleMode: string;
  scheduleTime: Date;
  //scheduleTime: string;
  startDate: string;
  endDate: string;
  messageTemplateOid: string;
  messageLanguage: string;
  instituteOid: string;
  status: string;
  createdBy: string;

  messageScheduleDetailList: MessageScheduleDetail[];
}
