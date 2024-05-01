import { StudentClassSectionChangeResponseBody } from "./student-class-section-change-response-body";
import { ResponseHeader } from "../../header/response-header";

export class StudentClassSectionChangeResponse {
  header: ResponseHeader;
  body: StudentClassSectionChangeResponseBody;
}
