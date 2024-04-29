import { RequestHeader } from "../../header/request-header";
import { AssetDetailByOidRequestBody } from "./asset-detail-by-oid-request-body";

export class AssetDetailByOidRequest {
  header: RequestHeader;
  body: AssetDetailByOidRequestBody;
}
