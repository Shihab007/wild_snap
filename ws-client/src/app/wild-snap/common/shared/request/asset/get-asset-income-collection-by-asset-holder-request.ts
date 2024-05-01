import { Header } from "src/app/common/request/base-request";
import { GetAssetIncomeCollectionByAssetHolderRequestBody } from "./get-asset-income-collection-by-asset-holder-request-body";

export class GetAssetIncomeCollectionByAssetHolderRequest {
  header: Header = new Header();
  body: GetAssetIncomeCollectionByAssetHolderRequestBody;
}
