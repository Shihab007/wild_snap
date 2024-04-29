import { Header } from "src/app/common/request/base-request";
import { GetAssetHolderByAssetDetailsOidRequestBody } from "./get-asset-holder-by-asset-details-oid-request-body";

export class GetAssetHolderByAssetDetailsOidRequest {
  header: Header = new Header();
  body: GetAssetHolderByAssetDetailsOidRequestBody;
}
