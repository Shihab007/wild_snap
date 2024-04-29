import { ResponseHeader } from "../../header/response-header";
import { FeeHeadGroupListResponseBody } from "./fee-head-group-list-response-body";

export class FeeHeadGroupListResponse {
  header: ResponseHeader;
  body: FeeHeadGroupListResponseBody;
}
