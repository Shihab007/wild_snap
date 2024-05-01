import { RequestHeader } from "../../header/request-header";
import { ThanaListRequestBody } from "./thana-list-request-body";

export class ThanaListRequest {
  header: RequestHeader;
  body: ThanaListRequestBody;
}
