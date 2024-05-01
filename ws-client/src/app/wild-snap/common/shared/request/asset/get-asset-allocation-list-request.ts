import { Header } from "src/app/common/request/base-request";
import { GetAssetAllocationListRequestBody } from "./get-asset-allocation-list-request-body";

export class GetAssetAllocationListRequest {
  header: Header = new Header();
  body: GetAssetAllocationListRequestBody;
}
