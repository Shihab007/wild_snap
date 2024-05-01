import { ResponseHeader } from "../../header/response-header";
import { ExamRejectByOidResponseBody } from "./exam-reject-by-oid-response-body";

export class ExamRejectByOidResponse {
  header: ResponseHeader;
  body: ExamRejectByOidResponseBody;
}
