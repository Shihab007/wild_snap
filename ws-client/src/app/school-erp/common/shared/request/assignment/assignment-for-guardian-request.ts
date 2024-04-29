import { AssignmentForGuardianRequestBody } from "./assignment-for-guardian-request-body";
import { Header } from "src/app/common/request/base-request";

export class AssignmentForGuardianRequest {
  header: Header = new Header();
  body: AssignmentForGuardianRequestBody;
}
