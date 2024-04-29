import { ResponseHeader } from "../../header/response-header";
import { StudentListByTextbookResponseBody } from "./student-respons-list-by-textbook-body";

export class StudentListByTextbookResponse {
  header: ResponseHeader;
  body: StudentListByTextbookResponseBody;
}
