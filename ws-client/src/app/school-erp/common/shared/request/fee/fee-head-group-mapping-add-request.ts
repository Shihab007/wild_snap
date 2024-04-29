import { Header } from "src/app/common/request/base-request";
import { FeeHeadGroupMappingAddRequestBody } from "./fee-head-group-mapping-add-request-body";

export class FeeHeadGroupMappingAddRequest {
  header: Header = new Header();
  body: FeeHeadGroupMappingAddRequestBody;
}
