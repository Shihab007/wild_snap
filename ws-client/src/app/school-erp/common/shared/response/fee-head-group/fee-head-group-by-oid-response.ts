import { ResponseHeader } from "../../header/response-header";
import { FeeHeadGroupByOidResponseBody } from "./fee-head-group-by-oid-response-body";

export class FeeHeadGroupByOidResponse {
  header: ResponseHeader;
  body: FeeHeadGroupByOidResponseBody;
}
