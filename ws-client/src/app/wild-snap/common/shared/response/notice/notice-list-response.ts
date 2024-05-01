import { ResponseHeader } from "../../header/response-header";
import { NoticeListResponseBody } from "./notice-list-response-body";

export class NoticeListResponse {
  header: ResponseHeader;
  body: NoticeListResponseBody;
}
