import { Header } from "src/app/common/request/base-request";
import { FeeHeadGroupListRequestBody } from "./fee-head-group-list-request-body";

export class FeeHeadGroupListRequest {
  header: Header = new Header();
  body: FeeHeadGroupListRequestBody;
}
