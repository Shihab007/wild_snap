import { ResponseHeader } from "../../header/response-header";
import { ExamResultPublishResponseBody } from "./exam-result-publish-response-body";

export class ExamResultPublishResponse {
  header: ResponseHeader;
  body: ExamResultPublishResponseBody;
}
