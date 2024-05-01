import { ResponseHeader } from "../../header/response-header";
import { GetMessageJobByOidResponseBody } from "./get-message-job-by-oid-response-body";

export class GetMessageJobByOidResponse {
  header: ResponseHeader;
  body: GetMessageJobByOidResponseBody;
}
