import { Header } from "src/app/common/request/base-request";
import { GetAssetIncomeCollectionByOidRequestBody } from "./get-asset-income-collection-by-oid-request-body";

export class GetAssetIncomeCollectionByOidRequest {
  header: Header = new Header();
  body: GetAssetIncomeCollectionByOidRequestBody
}
