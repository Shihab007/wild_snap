import { Header } from "src/app/common/request/base-request";
import { GetAssetIncomeCollectionByAssetRequestBody } from "./get-asset-income-collection-by-asset-request-body";

export class GetAssetIncomeCollectionByAssetRequest {
  header: Header = new Header();
  body: GetAssetIncomeCollectionByAssetRequestBody;
}
