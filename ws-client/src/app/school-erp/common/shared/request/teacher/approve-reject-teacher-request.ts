import { ApproveRejectTeacherRequestBody } from "./approve-reject-teacher-request-body";
import { RequestHeader } from "../../header/request-header";

export class ApproveRejectTeacherRequest {
  header: RequestHeader;
  body: ApproveRejectTeacherRequestBody;
}
