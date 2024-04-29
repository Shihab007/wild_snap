import { ResponseHeader } from "../../header/response-header";
import { ExamResultListResponseBody } from "./exam-result-list-response-body";

export class ExamResultListResponse {
  header: ResponseHeader;
  body: ExamResultListResponseBody;
}
