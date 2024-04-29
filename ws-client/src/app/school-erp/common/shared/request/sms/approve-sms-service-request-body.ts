export class ApproveSmsServiceRequestBody {
  oid: string;
  smsServiceOid: string;
  serviceType: string;
  requestSmsServiceStatus: string;
  approvedBy: string;
  approvedOn: Date;
}
