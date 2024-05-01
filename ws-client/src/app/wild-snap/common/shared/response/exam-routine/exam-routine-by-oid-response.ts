import { ResponseHeader } from "../../header/response-header";
import { ExamRoutineByOidResponseBody } from "./exam-routine-by-oid-response-body";

export class ExamRoutineByOidResponse {
  header: ResponseHeader;
  body: ExamRoutineByOidResponseBody;
}
