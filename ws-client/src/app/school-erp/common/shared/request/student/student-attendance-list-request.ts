import { RequestHeader } from "../../header/request-header";
import { AttendanceListRequestBody } from "./student-attendance-list-request-body";

export class AttendanceListRequest {
  header: RequestHeader;
  body: AttendanceListRequestBody;
}
