import { RequestHeader } from "../../header/request-header";
import { TeacherEditRequestBody } from "./teacher-edit-request-body";

export class TeacherEditRequest {
  header: RequestHeader;
  body: TeacherEditRequestBody;
}