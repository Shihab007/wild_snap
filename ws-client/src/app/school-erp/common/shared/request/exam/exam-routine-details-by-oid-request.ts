import { RequestHeader } from "../../header/request-header";
import { ExamRoutineDetailsByOidRequestBody } from "./exam-routine-details-by-oid-request-body";

export class ExamRoutineDetailsByOidRequest {
  header: RequestHeader;
  body: ExamRoutineDetailsByOidRequestBody;
}
