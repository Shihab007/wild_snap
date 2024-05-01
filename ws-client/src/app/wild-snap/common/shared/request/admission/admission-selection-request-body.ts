export class AdmissionSelectionRequestBody {

  oid: string;
  studentId: string;
  admissionId: string;
  instituteOid: string;
  nameEn: string;
  nameBn: string;
  phoneNumber: string;
  email: string;
  createdBy: string;
  updatedBy: string;
  smsServiceOid: string;
  sms: string;
  requestReceiveTime: Date;
  providerRequestTime: Date;
  providerResponseTime: Date;
  userName: string;
  password: string;
  feeSettingOid: string;
  feeAmount: number;

}
