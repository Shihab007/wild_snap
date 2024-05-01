import { RequestHeader } from "../../header/request-header";
import { StudentAddRequestBody } from "./student-add-request-body";

export class StudentAddRequest {
  header: RequestHeader;
  body: StudentAddRequestBody;
}