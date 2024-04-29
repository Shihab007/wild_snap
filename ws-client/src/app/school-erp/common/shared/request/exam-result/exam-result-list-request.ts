import { RequestHeader } from "../../header/request-header";
import { ExamResultListRequestBody } from "./exam-result-list-request-body";

export class ExamResultListRequest {
  header: RequestHeader;
  body: ExamResultListRequestBody;
}
