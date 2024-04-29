import { RequestHeader } from "../../header/request-header";
import { ExamPublishByOidRequestBody } from "./exam-publish-by-oid-request-body";

export class ExamPublishByOidRequest {
  header: RequestHeader;
  body: ExamPublishByOidRequestBody;
}
