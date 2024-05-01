import { RequestHeader } from "../../header/request-header";
import { StudentAttendanceListRequestBody } from "./student-attendance-list-request-body"

export class StudentAttendanceListRequest {
    header:RequestHeader;
    body:StudentAttendanceListRequestBody;
}
