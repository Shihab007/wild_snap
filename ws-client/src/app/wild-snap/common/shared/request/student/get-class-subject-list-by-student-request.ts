import { Header } from "src/app/common/request/base-request";
import { GetClassSubjectListByStudentRequestBody } from "./get-class-subject-list-by-student-request-body";

export class GetClassSubjectListByStudentRequest {
  header: Header = new Header();
  body: GetClassSubjectListByStudentRequestBody;
}
