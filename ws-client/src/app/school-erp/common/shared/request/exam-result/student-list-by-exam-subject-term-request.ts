import { RequestHeader } from "../../header/request-header";
import { StudentListByExamSubjectTermRequestBody } from "./student-list-by-exam-subject-term-request-body";

export class StudentListByExamSubjectTermRequest {
  header: RequestHeader;
  body: StudentListByExamSubjectTermRequestBody;
}
