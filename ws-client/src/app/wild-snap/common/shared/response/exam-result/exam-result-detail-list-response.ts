import { ResponseHeader } from "../../header/response-header";
import { ExamResultDetailListResponseBody } from "./exam-result-detail-list-response-body";

export class ExamResultDetailListResponse {
  header: ResponseHeader;
  body: ExamResultDetailListResponseBody;
}
