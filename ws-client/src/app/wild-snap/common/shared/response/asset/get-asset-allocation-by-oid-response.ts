import { ResponseHeader } from "../../header/response-header";
import { GetAssetAllocationByOidResponseBody } from "./get-asset-allocation-by-oid-response-body";

export class GetAssetAllocationByOidResponse {
  header: ResponseHeader;
  body: GetAssetAllocationByOidResponseBody;
}
