import { RequestHeader } from "../../header/request-header";
import { SaveExamResultRequestBody } from "./save-exam-result-request-body";

export class SaveExamResultRequest {
  header: RequestHeader;
  body: SaveExamResultRequestBody;
}
