import { ResponseHeader } from "../../header/response-header";
import { NoticeViewResponseBody } from "./notice-view-response-body";

export class NoticeViewResponse {
  header: ResponseHeader;
  body: NoticeViewResponseBody;
}
