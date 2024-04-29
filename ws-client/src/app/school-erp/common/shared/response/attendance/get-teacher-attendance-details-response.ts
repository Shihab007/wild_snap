import { ResponseHeader } from "../../header/response-header";
import { GetTeacherAttendanceDetailsResponseBody } from "./get-teacher-attendance-details-response-body";

export class GetTeacherAttendanceDetailsResponse {
  header: ResponseHeader;
  body: GetTeacherAttendanceDetailsResponseBody;
}
