import { FeesCollectionDetails } from "./fees-collection-details";

export class FeesCollection {
  oid: string;
  collectionDate: string;
  studentId: string;
  paymentCode: string;
  waiverPercentage: number;
  totalWaiverAmount: number;
  totalDiscountAmount: number;
  dueAmount: number;
  paidAmount: number;
  totalAmount: number;
  remarks: string;
  status: string;
  instituteOid: string;
  createdBy: string;


  headCode: string;
  headCodeNameEn: string;
  headCodeNameBn: string;
  feesCollectionDetail: FeesCollectionDetails[];
}
