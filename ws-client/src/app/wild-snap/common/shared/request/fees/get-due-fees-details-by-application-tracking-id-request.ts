import { Header } from "src/app/common/request/base-request";
import { RequestHeader } from "../../header/request-header";
import { GetDueFeesDetailsByStudentRequestBody } from "./get-due-fees-details-by-student-request-body";

export class GetDueFeesDetailsByApplicationTrackingIdRequest {
  header: RequestHeader = new RequestHeader();
  body: GetDueFeesDetailsByStudentRequestBody;
}
