import { RequestHeader } from "../../header/request-header";
import { RejectNoticeRequestBody } from "./reject-notice-request-body";

export class RejectNoticeRequest {
  header: RequestHeader;
  body: RejectNoticeRequestBody;
}
