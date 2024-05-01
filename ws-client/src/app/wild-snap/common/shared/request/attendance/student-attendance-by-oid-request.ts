import { RequestHeader } from "../../header/request-header";
import { StudentAttendanceByOidRequestBody } from "./student-attendance-by-oid-request-body";

export class StudentAttendanceByOidRequest {
  header: RequestHeader;
  body: StudentAttendanceByOidRequestBody;
}
