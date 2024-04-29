import { Header } from "src/app/common/request/base-request";
import { GetAssetAllocationByOidRequestBody } from "./get-asset-allocation-by-oid-request-body";

export class GetAssetAllocationByOidRequest {
  header: Header = new Header();
  body: GetAssetAllocationByOidRequestBody;
}
