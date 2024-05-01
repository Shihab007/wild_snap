import { RequestHeader } from "../../header/request-header";
import { ExamResultDetailByOidRequestBody } from "./get-exam-result-detail-request-body";

export class ExamResultDetailByOidRequest {
  header: RequestHeader;
  body: ExamResultDetailByOidRequestBody;
}