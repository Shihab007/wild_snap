import { ResponseHeader } from "../../header/response-header";
import { StudentListByExamSubjectTermResponseBody } from "./student-list-by-exam-subject-term-response-body";

export class StudentListByExamSubjectTermResponse {
  header: ResponseHeader;
  body: StudentListByExamSubjectTermResponseBody;
}
