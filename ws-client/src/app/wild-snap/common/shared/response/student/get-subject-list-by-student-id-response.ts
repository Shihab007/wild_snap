import { ResponseHeader } from "../../header/response-header";
import { GetSubjectListByStudentIdResponseBody } from "./get-subject-list-by-student-id-response-body";

export class GetSubjectListByStudentIdResponse {
  header: ResponseHeader;
  body: GetSubjectListByStudentIdResponseBody;
}
