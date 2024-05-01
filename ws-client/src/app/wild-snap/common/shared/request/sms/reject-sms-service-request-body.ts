export class RejectSmsServiceRequestBody {
  oid: string;
  smsServiceOid: string;
  statusType: string;
  requestSmsServiceStatus: string;
  approvedBy: string;
  approvedOn: Date;
}
