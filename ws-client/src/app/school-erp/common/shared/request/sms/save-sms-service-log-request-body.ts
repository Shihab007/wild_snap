export class SaveSmsServiceLogRequestBody {
  oid: string;
  smsServiceOid: string;
  presentSmsServiceStatus: string;
  requestSmsServiceStatus: string;
  requestedBy: string;
  requestedOn: Date;
  approvedBy: string;
  approvedOn: Date;
  remarks: string;
  status: string;
  serviceType: string;
  instituteOid: string;
  createdBy: string;
  smsTemplateName: string;
}
