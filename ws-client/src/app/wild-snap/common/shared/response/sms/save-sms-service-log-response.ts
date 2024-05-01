import { ResponseHeader } from "../../header/response-header";
import { SaveSmsServiceLogResponseBody } from "./save-sms-service-log-response-body";

export class SaveSmsServiceLogResponse {
  header: ResponseHeader;
  body: SaveSmsServiceLogResponseBody;
}
