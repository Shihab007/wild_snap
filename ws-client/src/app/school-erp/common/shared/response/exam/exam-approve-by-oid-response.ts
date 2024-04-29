import { ResponseHeader } from "../../header/response-header";
import { ExamApproveByOidResponseBody } from "./exam-approve-by-oid-response-body";

export class ExamApproveByOidResponse {
  header: ResponseHeader;
  body: ExamApproveByOidResponseBody;
}
