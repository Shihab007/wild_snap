import { RequestHeader } from "../../header/request-header";
import { StudentAttendance } from "../../model/attendance/student-attendance";

export class StudentAttendanceRequest {
  header: RequestHeader;
  body: StudentAttendance;
}
