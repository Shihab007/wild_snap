import { ResponseHeader } from "../../header/response-header";
import { GetMessageTemplateListResponseBody } from "./get-message-template-list-response-body";

export class GetMessageTemplateListResponse {
  header: ResponseHeader;
  body: GetMessageTemplateListResponseBody;
}
