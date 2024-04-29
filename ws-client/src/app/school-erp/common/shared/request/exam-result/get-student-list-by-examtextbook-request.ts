import { RequestHeader } from "../../header/request-header";
import { StudentListByExamTextbookRequestBody } from "./get-student-list-by-examtextbook-request-body";

export class StudentListByExamTextbookRequest {
  header: RequestHeader;
  body: StudentListByExamTextbookRequestBody;
}