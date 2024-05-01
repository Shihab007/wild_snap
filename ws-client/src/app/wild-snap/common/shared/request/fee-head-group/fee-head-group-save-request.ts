import { Header } from "src/app/common/request/base-request";
import { FeeHeadGroupSaveRequestBody } from "./fee-head-group-save-request-body";

export class FeeHeadGroupSaveRequest {
  header: Header = new Header();
  body: FeeHeadGroupSaveRequestBody;
}
