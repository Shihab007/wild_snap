import { RequestHeader } from "../../header/request-header";
import { StudentTextbookListRequestBody } from "./student-textbook-list-request-body";

export class StudentTextbookListRequest {
  header: RequestHeader;
  body: StudentTextbookListRequestBody;
}