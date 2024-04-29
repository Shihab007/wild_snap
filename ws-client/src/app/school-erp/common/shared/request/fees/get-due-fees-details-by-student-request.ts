import { Header } from "src/app/common/request/base-request";
import { GetDueFeesDetailsByStudentRequestBody } from "./get-due-fees-details-by-student-request-body";

export class GetDueFeesDetailsByStudentRequest {
  header: Header = new Header();
  body: GetDueFeesDetailsByStudentRequestBody;
}
