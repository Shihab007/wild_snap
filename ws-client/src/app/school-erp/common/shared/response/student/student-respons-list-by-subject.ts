import { ResponseHeader } from "../../header/response-header";
import { StudentListBySubjectResponseBody } from "./student-respons-list-by-subject-body";

export class StudentListBySubjectResponse {
  header: ResponseHeader;
  body: StudentListBySubjectResponseBody;
}
