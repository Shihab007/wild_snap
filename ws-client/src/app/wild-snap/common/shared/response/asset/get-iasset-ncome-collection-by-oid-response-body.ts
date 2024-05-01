import { AssetIncomeCollectionDetails } from "../../model/asset/asset-income-collection-details";

export class GetAssetIncomeCollectionByOidResponseBody {
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
  assetHolderNameEn: string;
  assetHolderNameBn: string;

  assetIncomeCollectionDetailsList: AssetIncomeCollectionDetails[];
}
