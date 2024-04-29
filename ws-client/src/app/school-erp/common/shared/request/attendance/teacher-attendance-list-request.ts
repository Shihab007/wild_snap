import { RequestHeader } from "../../header/request-header";
import { TeacherAttendanceListRequestBody } from "./teacher-attendance-list-request-body";

export class TeacherAttendanceListRequest {
  header: RequestHeader;
  body: TeacherAttendanceListRequestBody;
}
