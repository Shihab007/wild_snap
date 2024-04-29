import { VoucherPaymentDetailsList } from "../../model/voucher/voucher-payment-details-list";

export class PaymentViewResponseBody {

  oid: string;
  paymentId: string;
  paymentDate: string;
  paymentMode: string;
  transactionType: string;
  transactionNo: string;
  paidAmount: number;
  remarks: string;
  status: string;
  studentId: string;
  studentNameEn: string;
  studentNameBn: string;
  studentPhotoUrl: string;
  sessionNameEn: string;
  sessionNameBn: string;
  classNameEn: string;
  classNameBn: string;

  voucherPaymentDetailsList: VoucherPaymentDetailsList[] = [];

}
