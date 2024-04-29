import { Header } from "src/app/common/request/base-request";
import { RequestHeader } from "../../header/request-header";
import { AssetDetailListRequestBody } from "./asset-detail-list-request-body";

export class AssetDetailListRequest {
  header: Header = new Header();;
  body: AssetDetailListRequestBody;
}
