import { RequestHeader } from "../../header/request-header";
import { GetMessageJobListRequestBody } from "./get-message-job-list-request-body";

export class GetMessageJobListRequest {
  header: RequestHeader;
  body: GetMessageJobListRequestBody;
}
