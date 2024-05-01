import { AssetDueIncome } from "../../model/asset/asset-due-income";
import { AssetIncome } from "../../model/asset/asset-income";

export class GetAssetIncomeListResponseBody {
  assetIncomeList: AssetIncome[];
  assetDueIncomeList: AssetDueIncome[];
}
