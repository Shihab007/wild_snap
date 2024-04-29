import { RequestHeader } from "../../header/request-header";
import { TeacherProfileRequestBody } from "./teacher-profile-request-body";

export class TeacherProfileRequest {
    header: RequestHeader;
    body: TeacherProfileRequestBody;
  }