import { RequestHeader } from "../../header/request-header";
import { SaveTeacherAttendanceRequestBody } from "./save-teacher-attendance-request-body";

export class SaveTeacherAttendanceRequest {
  header: RequestHeader;
  body: SaveTeacherAttendanceRequestBody;
}
