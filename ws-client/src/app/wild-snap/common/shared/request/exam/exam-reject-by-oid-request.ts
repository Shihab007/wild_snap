import { RequestHeader } from "../../header/request-header";
import { ExamRejectByOidRequestBody } from "./exam-reject-by-oid-request-body";

export class ExamRejectByOidRequest {
  header: RequestHeader;
  body: ExamRejectByOidRequestBody;
}
