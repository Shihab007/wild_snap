import { Header } from "src/app/common/request/base-request";
import { GetSubjectListByStudentIdRequestBody } from "./get-subject-list-by-student-id-request-body";

export class GetSubjectListByStudentIdRequest {
  header: Header = new Header();
  body: GetSubjectListByStudentIdRequestBody;
}
