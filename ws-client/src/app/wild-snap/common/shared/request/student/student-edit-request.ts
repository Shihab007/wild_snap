import { RequestHeader } from "../../header/request-header";
import { StudentEditRequestBody } from "./student-edit-request-body";

export class StudentEditRequest {
    header: RequestHeader;
    body: StudentEditRequestBody;
  }