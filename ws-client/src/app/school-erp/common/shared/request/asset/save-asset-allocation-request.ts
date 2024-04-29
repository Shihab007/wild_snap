import { Header } from "src/app/common/request/base-request";
import { SaveAssetAllocationRequestBody } from "./save-asset-allocation-request-body";

export class SaveAssetAllocationRequest {
  header: Header = new Header();
  body: SaveAssetAllocationRequestBody;
}
