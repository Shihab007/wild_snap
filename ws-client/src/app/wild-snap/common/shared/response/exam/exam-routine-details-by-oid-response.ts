import { ResponseHeader } from "../../header/response-header";
import { ExamRoutine } from "../../model/exam-routine/exam-routine";
import { ExamRoutineDetailsByOidResponseBody } from "./exam-routine-details-by-oid-response-body";

export class ExamRoutineDetailsByOidResponse {
  header: ResponseHeader;
  body: ExamRoutineDetailsByOidResponseBody;
}
