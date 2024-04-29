import { RequestHeader } from "../../header/request-header";
import { CheckClassRoutineBySectionRequestBody } from "./check-class-routine-by-section-request-body";

export class CheckClassRoutineBySectionRequest {
  header: RequestHeader;
  body: CheckClassRoutineBySectionRequestBody;
}
