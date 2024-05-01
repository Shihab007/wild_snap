export class SaveVoucherRequestBody {
  feeSettingPaymentMode: string;
  voucherType: string;

  voucherNameEn: string = "";
  voucherNameBn: string;
  billingPeriod: string;
  paymentLastDate: Date;

  instituteSessionOid: string;
  instituteClassOid: string;

  feeSettingOid: string;
  feeHeadGroupOid: string;
  feeHeadGroupCode: string;
  feeAmount: number = 0;

  createdBy: string;
  instituteOid: string;

  studentList: StudentListForVoucher[];

}

export class StudentListForVoucher {
  studentOid: string;
  studentId: string;
  waiverAmount: number = 0;
  discountAmount: number = 0;
  dueAmount: number = 0;
  instituteClassGroupOid: string;
  instituteClassSectionOid: string;
}
