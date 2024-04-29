import { ResponseHeader } from "../../header/response-header";
import { AssetListResponseBody } from "./asset-list-response-body";

export class AssetListResponse {
  header: ResponseHeader;
  body: AssetListResponseBody;
}
