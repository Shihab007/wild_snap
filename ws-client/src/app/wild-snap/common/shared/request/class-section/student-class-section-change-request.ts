import { StudentClassSectionChangeRequestBody } from "./student-class-section-change-request-body";
import { RequestHeader } from "../../header/request-header";

export class StudentClassSectionChangeRequest {
  header: RequestHeader;
  body: StudentClassSectionChangeRequestBody;
}
