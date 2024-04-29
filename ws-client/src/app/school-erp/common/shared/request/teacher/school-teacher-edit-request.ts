import { Header } from "src/app/common/request/base-request";
import { RequestHeader } from "../../header/request-header";
import { SchoolTeacherEditRequestBody } from "./school-teacher-edit-request-body";

export class SchoolTeacherEditRequest {
  header: Header = new Header();
  body: SchoolTeacherEditRequestBody;
}
