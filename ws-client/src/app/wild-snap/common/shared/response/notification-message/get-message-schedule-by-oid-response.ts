import { ResponseHeader } from "../../header/response-header";
import { GetMessageScheduleByOidResponseBody } from "./get-message-schedule-by-oid-response-body";
import { GetMessageScheduleListResponseBody } from "./get-message-schedule-list-response-body";

export class GetMessageScheduleByOidResponse {
  header: ResponseHeader;
  body: GetMessageScheduleByOidResponseBody;
}
