import { ResponseHeader } from "../../header/response-header";
import { ExamPublishByOidResponseBody } from "./exam-publish-by-oid-response-body";

export class ExamPublishByOidResponse {
  header: ResponseHeader;
  body: ExamPublishByOidResponseBody;
}
