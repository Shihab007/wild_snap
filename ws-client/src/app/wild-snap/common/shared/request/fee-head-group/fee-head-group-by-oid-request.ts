import { Header } from "src/app/common/request/base-request";
import { FeeHeadGroupByOidRequestBody } from "./fee-head-group-by-oid-request-body";

export class FeeHeadGroupByOidRequest {
  header: Header = new Header();
  body: FeeHeadGroupByOidRequestBody;
}
