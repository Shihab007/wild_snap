import { ResponseHeader } from "../../header/response-header";
import { AssetDetailListResponseBody } from "./asset-detail-list-response-body";

export class AssetDetailListResponse {
  header: ResponseHeader;
  body: AssetDetailListResponseBody;
}
