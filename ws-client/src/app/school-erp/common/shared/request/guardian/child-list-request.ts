import { RequestHeader } from "../../header/request-header";
import { ChildListRequestBody } from "./child-list-request-body";

export class ChildListRequest {
  header: RequestHeader;
  body: ChildListRequestBody;
}
