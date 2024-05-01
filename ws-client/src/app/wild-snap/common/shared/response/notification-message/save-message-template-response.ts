import { ResponseHeader } from "../../header/response-header";
import { SaveMessageTemplateResponseBody } from "./save-message-template-response-body";

export class SaveMessageTemplateResponse {
  header: ResponseHeader;
  body: SaveMessageTemplateResponseBody;
}
