import { ResponseHeader } from "../../header/response-header";
import { GetClassByOidResponseBody } from "./get-class-by-oid-response-body";

export class GetClassByOidResponse {
  header: ResponseHeader;
  body: GetClassByOidResponseBody;
}
