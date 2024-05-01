import { ResponseHeader } from "../../header/response-header";
import { StudentAddResponseBody } from "./student-add-response-body";

export class StudentAddResponse {
  header: ResponseHeader;
  body: StudentAddResponseBody;
}