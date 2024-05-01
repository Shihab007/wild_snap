import { ResponseHeader } from "../../header/response-header";
import { GetTeacherAttendanceResponseBody } from "./get-teacher-attendance-response-body";

export class GetTeacherAttendanceResponse {
  header: ResponseHeader;
  body: GetTeacherAttendanceResponseBody;
}
