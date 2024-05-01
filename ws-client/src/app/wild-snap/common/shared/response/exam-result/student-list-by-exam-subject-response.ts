import { ResponseHeader } from "../../header/response-header";
import { StudentListByExamSubjectResponseBody } from "./student-list-by-exam-subject-response-body";

export class StudentListByExamSubjectResponse {
  header: ResponseHeader;
  body: StudentListByExamSubjectResponseBody;
}
