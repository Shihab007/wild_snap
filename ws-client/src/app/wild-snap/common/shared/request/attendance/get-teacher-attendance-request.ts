import { RequestHeader } from "../../header/request-header";
import { GetTeacherAttendanceRequestBody } from "./get-teacher-attendance-request-body";

export class GetTeacherAttendanceRequest {
  header: RequestHeader;
  body: GetTeacherAttendanceRequestBody;
}
