import { ResponseHeader } from "../../header/response-header";
import { ExamResultDetailByOidResponseBody } from "./get-exam-result-detail-response-body";

export class ExamResultDetailByOidResponse {
  header: ResponseHeader;
  body: ExamResultDetailByOidResponseBody;
}