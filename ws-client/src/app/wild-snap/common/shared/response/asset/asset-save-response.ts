import { ResponseHeader } from "../../header/response-header";
import { AssetSaveResponseBody } from "./asset-save-response-body";

export class AssetSaveResponse {
  header: ResponseHeader;
  body: AssetSaveResponseBody;
}
