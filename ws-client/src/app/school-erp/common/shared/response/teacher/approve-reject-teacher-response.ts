import { ApproveRejectTeacherResponseBody } from "./approve-reject-teacher-response-body";
import { RequestHeader } from "../../header/request-header";
import { ResponseHeader } from "../../header/response-header";

export class ApproveRejectTeacherResponse {
  header: ResponseHeader;
  body: ApproveRejectTeacherResponseBody;
}
