import { ResponseHeader } from "../../header/response-header";
import { GetAssetAllocationListResponseBody } from "./get-asset-allocation-list-response-body";

export class GetAssetAllocationListResponse {
  header: ResponseHeader;
  body: GetAssetAllocationListResponseBody;
}
