import { RequestHeader } from "../../header/request-header";
import { GetMessageScheduleListRequestBody } from "./get-message-schedule-list-request-body";

export class GetMessageScheduleListRequest {
  header: RequestHeader;
  body: GetMessageScheduleListRequestBody;
}
