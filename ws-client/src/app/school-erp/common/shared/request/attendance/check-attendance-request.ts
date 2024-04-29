import { RequestHeader } from "../../header/request-header";
import { StudentAttendance } from "../../model/attendance/student-attendance";
import { CheckAttendanceRequestBody } from "./check-attendance-request-body";

export class CheckAttendanceRequest {
  header: RequestHeader;
  body: CheckAttendanceRequestBody;
}
