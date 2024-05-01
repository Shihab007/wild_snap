import { RequestHeader } from "../../header/request-header";
import { ResponseHeader } from "../../header/response-header";
import { ExamListResponseBody } from "./exam-list-response-body";

export class ExamListResponse {
  header: ResponseHeader;
  body: ExamListResponseBody;
}
