import { ResponseHeader } from "../../header/response-header";
import { StudentAttendance } from "../../model/attendance/student-attendance";

export class StudentAttendanceByOidResponse {
  header: ResponseHeader;
  body: StudentAttendance;
}
