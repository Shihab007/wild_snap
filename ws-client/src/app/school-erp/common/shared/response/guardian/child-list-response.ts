import { ResponseHeader } from "../../header/response-header";
import { ChildListResponseBody } from "./child-list-response-body";

export class ChildListResponse {
  header: ResponseHeader;
  body: ChildListResponseBody;
}
