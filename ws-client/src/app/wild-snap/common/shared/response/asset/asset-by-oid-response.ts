import { ResponseHeader } from "../../header/response-header";
import { AssetByOidResponseBody } from "./asset-by-oid-response-body";

export class AssetByOidResponse {
  header: ResponseHeader;
  body: AssetByOidResponseBody;
}
