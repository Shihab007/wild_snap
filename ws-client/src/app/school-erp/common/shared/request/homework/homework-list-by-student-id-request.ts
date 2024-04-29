import { Header } from "src/app/common/request/base-request";
import { HomeworkListByStudentIdRequestBody } from "./homework-list-by-student-id-request-body";

export class HomeworkListByStudentIdRequest {
  header: Header;
  body: HomeworkListByStudentIdRequestBody;

}
