import { Header } from "src/app/common/request/base-request";
import { GetAssetIncomeCollectionListRequestBody } from "./get-asset-income-collection-list-request-body";

export class GetAssetIncomeCollectionListRequest {
  header: Header = new Header();
  body: GetAssetIncomeCollectionListRequestBody
}
