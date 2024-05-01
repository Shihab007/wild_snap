import { ResponseHeader } from "../../header/response-header";
import { SaveAssetAllocationResponseBody } from "./save-asset-allocation-response-body";

export class SaveAssetAllocationResponse {
  header: ResponseHeader;
  body: SaveAssetAllocationResponseBody;
}
