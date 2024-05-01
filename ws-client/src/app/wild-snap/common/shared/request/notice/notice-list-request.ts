import { Header } from "src/app/common/request/base-request";
import { RequestHeader } from "../../header/request-header";
import { NoticeListRequestBody } from "./notice-list-request-body";

export class NoticeListRequest {

  header: Header = new Header();
  body: NoticeListRequestBody;

}
