import { RejectNoticeResponseBody } from "./reject-notice-response-body";
import { ResponseHeader } from "../../header/response-header";

export class RejectNoticeResponse {
  header: ResponseHeader;
  body: RejectNoticeResponseBody;
}
