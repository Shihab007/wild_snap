import { ResponseHeader } from "../../header/response-header";
import { SaveExamResultResponseBody } from "./save-exam-result-response-body";

export class SaveExamResultResponse {
  header: ResponseHeader;
  body: SaveExamResultResponseBody;
}
