import { ApproveNoticeRequestBody } from "./approve-notice-request-body";
import { RequestHeader } from "../../header/request-header";

export class ApproveNoticeRequest {
  header: RequestHeader;
  body: ApproveNoticeRequestBody;
}
