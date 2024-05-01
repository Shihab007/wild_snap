import { VoucherDetail } from "./voucher-detail";

export class Voucher {

  oid: string;
  voucherNo: string;
  nameEn: string;
  nameBn: string;
  voucherDate: string;
  paymentLastDate: string;
  feeAmount: number;
  waiverAmount: number;
  discountAmount: number;
  dueAmount: number;
  paidAmount: number;
  remarks: string;
  status: string;
  debitLedgerOid: string;
  debitSubLedgerOid: string;
  creditLedgerOid: string;
  creditSubLedgerOid: string;
  feeDueOid: string;
  studentId: string;
  studentNameEn: string;
  studentNameBn: string;
  studentRollNo: string;
  studentMobileNo: string;
  studentEmail: string;
  studentPhotoUrl: string;
  instituteClassGroupOid: string;
  classGroupNameEn: string;
  classGroupNameBn: string;
  instituteClassSectionOid: string;
  classSectionNameEn: string;
  classSectionNameBn: string;
  instituteClassOid: string;
  classNameEn: string;
  classNameBn: string;
  instituteSessionOid: string;
  sessionNameEn: string;
  sessionNameBn: string;
  feeHeadGroupOid: string;
  feeHeadGroupCode: string;
  instituteOid: string;
  instituteNameEn: string;
  instituteNameBn: string;
  instituteLogoUrl: string;

  voucherDetailList: VoucherDetail[];

}
