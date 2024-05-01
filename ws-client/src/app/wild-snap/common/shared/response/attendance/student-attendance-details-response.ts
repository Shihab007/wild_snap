import { ResponseHeader } from "../../header/response-header";
import { StudentAttendance } from "../../model/attendance/student-attendance";
import { StudentAttendanceDetailsResponseBody } from "./student-attendance-details-response-body";

export class StudentAttendanceDetailsResponse {
  header: ResponseHeader;
  body: StudentAttendance;
}