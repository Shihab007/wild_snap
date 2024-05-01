import { IncomeCollectionByAssetHolder } from "../../model/asset/income-collection-by-asset-holder";

export class GetAssetIncomeCollectionByAssetHolderResponseBody {
  nameEn: string;
  nameBn: string;
  dateOfBirth: string;
  mobileNo: string;
  email: string;
  incomeCollectionList: IncomeCollectionByAssetHolder[];

}
