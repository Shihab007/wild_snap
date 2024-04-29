import { RequestHeader } from "../../header/request-header";
import { ExamRoutineRequestBody } from "./exam-routine-request-body";

export class ExamRoutineRequest {
  header: RequestHeader;
  body: ExamRoutineRequestBody;
}
