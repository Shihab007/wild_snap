import { ResponseHeader } from "../../header/response-header";
import { DivisionListResponseBody } from "./division-list-response-body";

export class DivisionListResponse {
  header: ResponseHeader;
  body: DivisionListResponseBody;
}
