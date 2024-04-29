import { RequestHeader } from "../../header/request-header";
import { ExamRoutineRejectByOidRequestBody } from "./exam-routine-reject-by-oid-request-body";

export class ExamRoutineRejectByOidRequest {
  header: RequestHeader;
  body: ExamRoutineRejectByOidRequestBody;
}
