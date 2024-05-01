import { RequestHeader } from "../../header/request-header";
import { ExamApproveByOidRequestBody } from "./exam-approve-by-oid-request-body";

export class ExamApproveByOidRequest {
  header: RequestHeader;
  body: ExamApproveByOidRequestBody;
}
