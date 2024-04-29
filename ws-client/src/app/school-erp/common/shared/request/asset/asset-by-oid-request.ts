import { RequestHeader } from "../../header/request-header";
import { AssetByOidRequestBody } from "./asset-by-oid-request-body";

export class AssetByOidRequest {
  header: RequestHeader;
  body: AssetByOidRequestBody;
}
