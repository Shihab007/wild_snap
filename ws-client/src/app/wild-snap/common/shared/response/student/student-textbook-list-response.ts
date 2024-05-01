import { ResponseHeader } from "../../header/response-header";
import { StudentTextbookListResponseBody } from "./student-textbook-list-response-body";

export class StudentTextbookListResponse {
  header: ResponseHeader;
  body: StudentTextbookListResponseBody;
}