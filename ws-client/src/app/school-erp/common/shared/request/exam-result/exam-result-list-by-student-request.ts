import { RequestHeader } from "../../header/request-header";
import { ExamResultListByStudentRequestBody } from "./exam-result-list-by-student-request-body"

export class ExamResultListByStudentRequest {
  header: RequestHeader;
  body: ExamResultListByStudentRequestBody;
}
