import { Header } from "src/app/common/request/base-request";
import { SaveAssetIncomeRequestBody } from "./save-asset-income-request-body";

export class SaveAssetIncomeRequest {
  header: Header = new Header();
  body: SaveAssetIncomeRequestBody;
}
