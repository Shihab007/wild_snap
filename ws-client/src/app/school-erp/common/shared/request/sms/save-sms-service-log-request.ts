import { Header } from "src/app/common/request/base-request";
import { SaveSmsServiceLogRequestBody } from "./save-sms-service-log-request-body";

export class SaveSmsServiceLogRequest {
  header: Header = new Header();
  body: SaveSmsServiceLogRequestBody;
}
