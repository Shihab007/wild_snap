import { MessageJobDetail } from "../../model/notification-message/message-job-detail";

export class GetMessageJobByOidResponseBody {

  oid: string;
  smsJobTitle: string;
  startedOn: string;
  messageText: string;
  totalSms: number;
  sentSms: number;
  failedSms: number;
  pendingSms: number;
  progress: number;
  instituteOid: string;
  status: string;
  createdBy: string;

  messageJobDetailList: MessageJobDetail[];
}


