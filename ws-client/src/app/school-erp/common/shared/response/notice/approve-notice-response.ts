import { ApproveNoticeResponseBody } from "./approve-notice-response-body";
import { ResponseHeader } from "../../header/response-header";

export class ApproveNoticeResponse {
  header: ResponseHeader;
  body: ApproveNoticeResponseBody;
}
