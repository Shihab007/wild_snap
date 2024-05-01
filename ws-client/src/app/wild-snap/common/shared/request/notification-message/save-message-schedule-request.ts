import { Header } from "src/app/common/request/base-request";
import { SaveMessageScheduleRequestBody } from "./save-message-schedule-request-body";

export class SaveMessageScheduleRequest {
  header: Header = new Header();
  body: SaveMessageScheduleRequestBody;
}
