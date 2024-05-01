import { ResponseHeader } from "../../header/response-header";
import { GetMessageJobListResponseBody } from "./get-message-job-list-response-body";

export class GetMessageJobListResponse {
  header: ResponseHeader;
  body: GetMessageJobListResponseBody;
}
