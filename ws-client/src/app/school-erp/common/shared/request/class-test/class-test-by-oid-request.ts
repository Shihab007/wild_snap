import { RequestHeader } from "../../header/request-header";
import { ResponseHeader } from "../../header/response-header";
import { ClassTestByOidRequestBody } from "./class-test-by-oid-request-body";

export class ClassTestByOidRequest {
  header: RequestHeader;
  body: ClassTestByOidRequestBody;

}
