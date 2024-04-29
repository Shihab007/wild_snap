import { ResponseHeader } from "../../header/response-header";
import { StudentListByExamTextbookResponseBody } from "./get-student-list-by-examtextbook-response-body";

export class StudentListByExamTextbookResponse {
  header: ResponseHeader;
  body: StudentListByExamTextbookResponseBody;
}
