import { ResponseHeader } from "../../header/response-header";
import { GetMessageScheduleListResponseBody } from "./get-message-schedule-list-response-body";

export class GetMessageScheduleListResponse {
  header: ResponseHeader;
  body: GetMessageScheduleListResponseBody;
}
