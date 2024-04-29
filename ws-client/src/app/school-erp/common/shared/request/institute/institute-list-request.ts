import { Header } from "src/app/common/request/base-request";
import { RequestHeader } from "../../header/request-header";
import { InstituteListRequestBody } from "./institute-list-request-body";

export class InstituteListRequest {
  header: Header = new Header();
  body: InstituteListRequestBody;
}
