import { RequestHeader } from "../../header/request-header";
import { StudentListByExamSubjectRequestBody } from "./student-list-by-exam-subject-request-body";

export class StudentListByExamSubjectRequest {
  header: RequestHeader;
  body: StudentListByExamSubjectRequestBody;
}
