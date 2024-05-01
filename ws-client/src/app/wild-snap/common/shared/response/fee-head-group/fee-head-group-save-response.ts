import { ResponseHeader } from "../../header/response-header";
import { FeeHeadGroupSaveResponseBody } from "./fee-head-group-save-response-body";

export class FeeHeadGroupSaveResponse {
  header: ResponseHeader;
  body: FeeHeadGroupSaveResponseBody;
}
