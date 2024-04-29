import { IncomeCollectionByAsset } from "../../model/asset/income-collection-by-asset";

export class GetAssetIncomeCollectionByAssetResponseBody {
  nameEn: string;
  nameBn: string;
  assetHolderNameEn: string;
  assetHolderNameBn: string;
  rentAmount: number;
  paidAmount: number;
  dueAmount: number;
  inTotalReceivedAmount: number;
  inTotalAdjustmentAdvanceAmount: number;
  inTotalTotalReceivedAmount: number;

  assetIncomeCollectionDetailsList: IncomeCollectionByAsset[];
}
