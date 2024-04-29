import { RequestHeader } from "../../header/request-header";
import { ExamBookByOidRequestBody } from "./exam-book-by-oid-request-body";

export class ExamBookByOidRequest {
  header: RequestHeader;
  body: ExamBookByOidRequestBody;
}
