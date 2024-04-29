import { Header } from "src/app/common/request/base-request";
import { UpdateStudentSubjectRequestBody } from "./update-student-subject-request-body";

export class UpdateStudentSubjectRequest {
  header: Header = new Header();
  body: UpdateStudentSubjectRequestBody;
}
