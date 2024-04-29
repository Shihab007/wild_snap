import { AssignmentForGuardianResponseBody } from "./assignment-for-guardian-response-body";
import { ResponseHeader } from "../../header/response-header";

export class AssignmentForGuardianResponse {
  header: ResponseHeader = new ResponseHeader();
  body: AssignmentForGuardianResponseBody;
}
