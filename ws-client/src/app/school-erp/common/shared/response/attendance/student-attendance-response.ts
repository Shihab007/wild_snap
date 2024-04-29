import { ResponseHeader } from "../../header/response-header";
import { StudentAttendanceResponseBody } from "./student-attendance-response-body";

export class StudentAttendanceResponse {
  header: ResponseHeader;
  body: StudentAttendanceResponseBody;

}
