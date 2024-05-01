import { AssignmentListByGuardianResponseBody } from "./assignment-list-by-guardian-response-body";
import { ResponseHeader } from "../../header/response-header";

export class AssignmentListByGuardianResponse {
  header: ResponseHeader = new ResponseHeader();
  body: AssignmentListByGuardianResponseBody;
}
