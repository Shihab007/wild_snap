import { RequestHeader } from "../../header/request-header";
import { GuardianTeacherListRequestBody } from "./guardian-teacher-list-request-body";

export class GuardianTeacherListRequest {
  header: RequestHeader;
  body: GuardianTeacherListRequestBody;
}
