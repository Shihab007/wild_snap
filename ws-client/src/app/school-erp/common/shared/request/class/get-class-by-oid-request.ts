import { RequestHeader } from "../../header/request-header";
import { GetClassByOidRequestBody } from "./get-class-by-oid-request-body";

export class GetClassByOidRequest {
  header: RequestHeader;
  body: GetClassByOidRequestBody;
}
