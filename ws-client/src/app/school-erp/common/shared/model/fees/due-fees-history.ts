export class DueFeesHistory {
  oid: string;
  headCode: string;
  feeHeadOid: string;
  headNameEn: string;
  headNameBn: string;
  headCodeNameEn: string;
  headCodeNameBn: string;
  dueAmount: number;
  dueAmountStr: number;
  paidAmount: number;
  remainAmount: number;
  paymentType: String;
  paymentCode: String;
  referenceNo: string;
  applicationTrackingId: string;

  currentPaidAmount: number = 0;

  remarks: string;
  status: string;
  isMandatory: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  instituteOid: string;
  instituteClassOid: string;

  studentId: string;
  studentOid: string;
  dueFeesModelHistoryList: DueFeesHistory[];
}
