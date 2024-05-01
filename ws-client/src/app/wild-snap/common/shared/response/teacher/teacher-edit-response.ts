import { ResponseHeader } from "../../header/response-header";
import { TeacherEditResponseBody } from "./teacher-edit-response-body";

export class TeacherEditResponse {
  header: ResponseHeader;
  body: TeacherEditResponseBody;
}