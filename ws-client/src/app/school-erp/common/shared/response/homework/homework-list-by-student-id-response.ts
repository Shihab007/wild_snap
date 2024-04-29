import { ResponseHeader } from "../../header/response-header";
import { HomeworkListByStudentIdResponseBody } from "./homework-list-by-student-id-response-body";

export class HomeworkListByStudentIdResponse {
  header: ResponseHeader;
  body: HomeworkListByStudentIdResponseBody;
}
