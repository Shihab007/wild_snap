export class UpdateFeeDueRequestBody {
  //basics
  oid: string;
  nameEn: string;
  nameBn: string;

  //dates & amounts
  feeDueDate: Date;
  paymentLastDate: Date;
  feeAmount: number;
  waiverAmount: number;
  discountAmount: number;
  dueAmount: number;
  paidAmount: number;

  //references
  feeDueId: string;
  billingPeriod: string;
  feeSettingOid: string;
  feeHeadGroupOid: string;
  feeHeadGroupCode: string;

  //ledger information
  debitLedgerOid: string;
  debitSubLedgerOid: string;
  creditLedgerOid: string;
  creditSubLedgerOid: string;




  //student information
  applicationTrackingId: string;
  applicantNameEn: string;
  applicantNameBn: string;
  applicantMobileNo: string;


  studentId: string;
  studentNameEn: string;
  studentNameBn: string;
  studentMobileNo: string;
  studentPhotoUrl: string;
  instituteSessionOid: string;
  sessionNameEn: string;
  sessionNameBn: string;
  instituteClassOid: string;
  classNameEn: string;
  classNameBn: string;
  classRoll: string;
  instituteClassGroupOid: string;
  classGroupNameEn: string;
  classGroupNameBn: string;
  instituteClassSectionOid: string;
  classSectionNameEn: string;
  classSectionNameBn: string;


  //institute information
  instituteOid: string;
  instituteNameEn: string;
  instituteNameBn: string;
  instituteLogoUrl: string;

  //institute information
  remarks: string;
  status: string;
  createdBy: string;
  CreatedOn: Date;

  feeDueDetailList: UpdateFeeDueDetail[] = [];
}


export class UpdateFeeDueDetail {
  oid: string;
  feeHeadOid: string;
  feeDueOid: string;
  feeHeadNameBn: string;
  feeHeadNameEn: string;
  feeHeadCode: string;
  feeHeadType: string;
  createdOn: Date;
  feeAmount: number;
  instituteOid: string;
  createdBy: string;

  newFeeAmount: number;
}