import { ResponseHeader } from "../../header/response-header";
import { AttendanceListResponseBody } from "./student-attendance-list-response-body";

export class AttendanceListResponse {
  header: ResponseHeader;
  body: AttendanceListResponseBody;
}
