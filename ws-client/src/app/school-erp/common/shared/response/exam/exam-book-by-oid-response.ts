import { ResponseHeader } from "../../header/response-header";
import { ExamBookByOidResponseBody } from "./exam-book-by-oid-response-body";

export class ExamBookByOidResponse {
  header: ResponseHeader;
  body: ExamBookByOidResponseBody;
}
