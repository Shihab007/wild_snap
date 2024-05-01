import { Header } from "src/app/common/request/base-request";
import { FeeHeadGroupMappingByInstituteAndGroupRequestBody } from "./fee-head-group-mapping-by-institute-and-group-request-body";

export class FeeHeadGroupMappingByInstituteAndGroupRequest {
  header: Header = new Header();
  body: FeeHeadGroupMappingByInstituteAndGroupRequestBody;
}
