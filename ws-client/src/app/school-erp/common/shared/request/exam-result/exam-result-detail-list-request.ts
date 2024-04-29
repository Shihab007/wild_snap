import { RequestHeader } from "../../header/request-header";
import { ExamResultDetailListRequestBody } from "./exam-result-detail-list-request-body";

export class ExamResultDetailListRequest {
  header: RequestHeader;
  body: ExamResultDetailListRequestBody;
}
