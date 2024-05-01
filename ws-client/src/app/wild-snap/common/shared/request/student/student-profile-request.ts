import { RequestHeader } from "../../header/request-header";
import { StudentProfileRequestBody } from "./student-profile-request-body";

export class StudentProfileRequest {
    header: RequestHeader;
    body: StudentProfileRequestBody;
  }