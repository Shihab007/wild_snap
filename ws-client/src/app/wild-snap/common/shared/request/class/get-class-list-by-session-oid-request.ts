import { RequestHeader } from "../../header/request-header";
import { GetClassListBySessionOidRequestBody } from "./get-class-list-by-session-oid-request-body";

export class GetClassListBySessionOidRequest {
  header: RequestHeader;
  body: GetClassListBySessionOidRequestBody;
}
