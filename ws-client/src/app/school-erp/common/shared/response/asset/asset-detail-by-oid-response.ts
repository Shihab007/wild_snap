import { ResponseHeader } from "../../header/response-header";
import { AssetDetailByOidResponseBody } from "./asset-detail-by-oid-response-body";

export class AssetDetailByOidResponse {
  header: ResponseHeader;
  body: AssetDetailByOidResponseBody;
}
