import { ResponseHeader } from "../../header/response-header";
import { AssetDetailSaveResponseBody } from "./asset-detail-save-response-body";

export class AssetDetailSaveResponse {
  header: ResponseHeader;
  body: AssetDetailSaveResponseBody;
}
