
import { VoucherPaymentDetail } from "../../model/voucher/voucher-payment-detail";

export class VoucherPaymentListRequest {
  oid: String;
  paymentId: String;
  paymentDate: Date;

  paymentMode: String;
  transactionType: String;
  transactionNo: String;
  bankAccountNo: String;
  mobileNo: String;
  paidAmount: number;
  remarks: String;
  status: String;
  studentId: String;
  instituteOid: String;
  createdBy: String;

  voucherList: VoucherPaymentDetail[] = [];
}
