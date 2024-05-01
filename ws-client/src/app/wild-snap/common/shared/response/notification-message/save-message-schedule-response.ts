import { ResponseHeader } from "../../header/response-header";
import { SaveMessageScheduleResponseBody } from "./save-message-schedule-response-body";

export class SaveMessageScheduleResponse {
  header: ResponseHeader;
  body: SaveMessageScheduleResponseBody;
}
