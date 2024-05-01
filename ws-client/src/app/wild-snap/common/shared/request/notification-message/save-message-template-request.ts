import { Header } from "src/app/common/request/base-request";
import { SaveMessageTemplateRequestBody } from "./save-message-template-request-body";

export class SaveMessageTemplateRequest {
  header: Header = new Header();
  body: SaveMessageTemplateRequestBody;
}
