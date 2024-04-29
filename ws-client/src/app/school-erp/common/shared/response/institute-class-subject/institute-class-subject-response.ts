import { ResponseHeader } from "../../header/response-header";
import { InstituteClassSubjectResponseBody } from "./institute-class-subject-request-body";

export class InstituteClassSubjectResponse {
  header: ResponseHeader;
  body: InstituteClassSubjectResponseBody;
}
