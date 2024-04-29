import { ResponseHeader } from "../../header/response-header";
import { ExamRoutineResponseBody } from "./exam-routine-response-body";

export class ExamRoutineResponse {
  header: ResponseHeader;
  body: ExamRoutineResponseBody;
}
