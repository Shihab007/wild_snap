import { ResponseHeader } from "../../header/response-header";
import { CountyListResponseBody } from "./county-list-response-body";

export class CountyListResponse {
  header: ResponseHeader;
  body: CountyListResponseBody;
}
