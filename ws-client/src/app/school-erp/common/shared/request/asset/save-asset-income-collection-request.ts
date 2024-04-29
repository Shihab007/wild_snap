import { Header } from "src/app/common/request/base-request";
import { SaveAssetIncomeCollectionRequestBody } from "./save-asset-income-collection-request-body";

export class SaveAssetIncomeCollectionRequest {
  header: Header = new Header();
  body: SaveAssetIncomeCollectionRequestBody
}
