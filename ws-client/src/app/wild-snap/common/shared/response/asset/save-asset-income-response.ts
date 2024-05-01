import { ResponseHeader } from "../../header/response-header";
import { SaveAssetIncomeResponseBody } from "./save-asset-income-response-body";

export class SaveAssetIncomeResponse {
  header: ResponseHeader;
  body: SaveAssetIncomeResponseBody;
}
