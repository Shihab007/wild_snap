import { ResponseHeader } from "../../header/response-header";
import { GetMessageTemplateParameterListResponseBody } from "./get-message-template-parameter-list-response-body";

export class GetMessageTemplateParameterListResponse {
  header: ResponseHeader;
  body: GetMessageTemplateParameterListResponseBody;
}
