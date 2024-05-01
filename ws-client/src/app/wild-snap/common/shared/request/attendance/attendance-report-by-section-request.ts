import { RequestHeader } from "../../header/request-header";
import { StudentAttendanceList } from "../../model/attendance/student-attendance-list";

export class AttendanceReportBySectionRequest {
  header: RequestHeader;
  body: StudentAttendanceList = new StudentAttendanceList();
}
