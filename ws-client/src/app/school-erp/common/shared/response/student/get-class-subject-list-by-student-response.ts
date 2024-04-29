import { ResponseHeader } from "../../header/response-header";
import { GetClassSubjectListByStudentResponseBody } from "./get-class-subject-list-by-student-response-body";

export class GetClassSubjectListByStudentResponse {
  header: ResponseHeader;
  body: GetClassSubjectListByStudentResponseBody;
}
