import { Header } from "src/app/common/request/base-request";
import { AssignmentListByGuardianRequestBody } from "./assignment-list-by-guardian-request-body";

export class AssignmentListByGuardianRequest {
  header: Header = new Header();
  body: AssignmentListByGuardianRequestBody;
}
