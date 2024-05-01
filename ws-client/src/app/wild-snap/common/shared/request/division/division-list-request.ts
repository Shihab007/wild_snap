import { RequestHeader } from "../../header/request-header";
import { DivisionListRequestBody } from "./division-list-request-body";

export class DivisionListRequest {
  header: RequestHeader;
  body: DivisionListRequestBody;
}
