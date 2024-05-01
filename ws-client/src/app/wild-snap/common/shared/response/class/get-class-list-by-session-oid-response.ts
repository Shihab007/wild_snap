import { ResponseHeader } from "../../header/response-header";
import { GetClassListBySessionOidResponseBody } from "./get-class-list-by-session-oid-response-body";

export class GetClassListBySessionOidResponse {
  header: ResponseHeader;
  body: GetClassListBySessionOidResponseBody;
}
