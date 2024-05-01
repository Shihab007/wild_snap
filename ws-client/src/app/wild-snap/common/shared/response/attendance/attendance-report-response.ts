import { ResponseHeader } from "../../header/response-header";
import { StudentAttendanceList } from "../../model/attendance/student-attendance-list";

export class AttendanceReportResponse {
  header: ResponseHeader;
  body: StudentAttendanceList;
}
