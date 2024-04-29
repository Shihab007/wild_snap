import { ResponseHeader } from "../../header/response-header";
import { GetDueFeesDetailsByStudentResponseBody } from "./get-due-fees-details-by-student-response-body";

export class GetDueFeesDetailsByStudentResponse {
  header: ResponseHeader;
  body: GetDueFeesDetailsByStudentResponseBody;
}
