import { IncomeCollectionDetailsByAssetHolder } from "./income-collection-details-by-asset-holder";

export class IncomeCollectionByAssetHolder {
  assetDetailsOid: string;
  titleEn: string;
  titleBn: string;
  assetDetailNameEn: string;
  assetDetailNameBn: string;
  rentAmount: number;
  advanceAmount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  incomeCollectionDetailList: IncomeCollectionDetailsByAssetHolder[]
}
