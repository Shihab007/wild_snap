import { ResponseHeader } from "../../header/response-header";
import { ThanaListResponseBody } from "./thana-list-response-body";

export class ThanaListResponse {
  header: ResponseHeader;
  body: ThanaListResponseBody;
}
