import { ResponseHeader } from "../../header/response-header";
import { StudentAttendance } from "../../model/attendance/student-attendance";
import { StudetAttendanceDetail } from "../../model/attendance/studet-attendance-detail";
import { SectionStudentListResponseBody } from "./section-student-list-response-body";

export class SectionStudentListResponse {
  header: ResponseHeader;
  body: SectionStudentListResponseBody;
}
