import { RequestHeader } from "../../header/request-header";
import { CreateFinalExamMarkSheetRequestBody } from "./create-final-exam-mark-sheet-request-body";

export class CreateFinalExamMarkSheetRequest {
  header: RequestHeader;
  body: CreateFinalExamMarkSheetRequestBody;
}
