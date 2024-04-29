import { RequestHeader } from "../../header/request-header";
import { StudentAttendanceDetailsRequestBody } from "./student-attendance-details-request-body";

export class StudentAttendanceDetailsRequest{
  header: RequestHeader
  body: StudentAttendanceDetailsRequestBody;
}
