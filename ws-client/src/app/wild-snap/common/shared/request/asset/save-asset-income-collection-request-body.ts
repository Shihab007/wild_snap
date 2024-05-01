import { AssetIncomeCollectionDetails } from "../../model/asset/asset-income-collection-details";

export class SaveAssetIncomeCollectionRequestBody {
  oid: string;
  incomeCollectionId: string;
  collectionDate: string;
  paymentMode: string;
  receivedAmount: number;
  adjustmentAdvanceAmount: number;
  totalReceivedAmount: number;
  status: string;
  remarks: string;
  assetHolderOid: string;
  instituteOid: string;
  createdBy: string;

  incomeCollectionDetails: AssetIncomeCollectionDetails[];
}
