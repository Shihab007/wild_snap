import { ResponseHeader } from "../../header/response-header";
import { SaveTeacherAttendanceResponseBody } from "./save-teacher-attendance-response-body";

export class SaveTeacherAttendanceResponse {
  header: ResponseHeader;
  body: SaveTeacherAttendanceResponseBody;
}
