import { RequestHeader } from "../../header/request-header";
import { GetTeacherAttendanceDetailsRequestBody } from "./get-teacher-attendance-details-request-body";

export class GetTeacherAttendanceDetailsRequest {
  header: RequestHeader;
  body: GetTeacherAttendanceDetailsRequestBody;
}
