import { ResponseHeader } from "../../header/response-header";
import { CreateExamResultMarkSheetResponseBody } from "./create-exam-result-mark-sheet-response-body";

export class CreateExamResultMarkSheetResponse {
  header: ResponseHeader;
  body: CreateExamResultMarkSheetResponseBody;
}
