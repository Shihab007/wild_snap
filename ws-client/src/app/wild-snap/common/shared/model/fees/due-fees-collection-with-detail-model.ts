import { DueFeesCollectionDetailModel } from "./due-fees-collection-detail-model";

export class DueFeesCollectionWithDetailModel {

  collectionDate: Date;
  studentId: String;
  paymentCode: String;
  totalWaiverAmount: number;
  totalDiscountAmount: number;
  dueAmount: number;
  paidAmount: number;
  totalAmount: number;
  remarks: String;
  createdBy: String;
  feesCollectionDetail: DueFeesCollectionDetailModel[] = [];
}