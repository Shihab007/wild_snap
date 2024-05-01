import { ResponseHeader } from "../../header/response-header";
import { GetMessageTemplateByOidResponseBody } from "./get-message-template-by-oid-response-body";

export class GetMessageTemplateByOidResponse {
  header: ResponseHeader;
  body: GetMessageTemplateByOidResponseBody;
}
