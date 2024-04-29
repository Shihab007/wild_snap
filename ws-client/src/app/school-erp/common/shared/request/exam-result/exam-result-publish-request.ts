import { RequestHeader } from "../../header/request-header";
import { ExamResultPublishRequestBody } from "./exam-result-publish-request-body";

export class ExamResultPublishRequest {
  header: RequestHeader;
  body: ExamResultPublishRequestBody;
}
