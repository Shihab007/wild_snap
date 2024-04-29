import { RequestHeader } from "../../header/request-header";
import { ExamRoutineByOidRequestBody } from "./exam-routine-by-oid-request-body";

export class ExamRoutineByOidRequest {
  header: RequestHeader;
  body: ExamRoutineByOidRequestBody;
}
