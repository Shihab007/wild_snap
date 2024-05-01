import { RequestHeader } from "../../header/request-header";
import { InstituteGuardianListRequestBody } from "./institute-guardian-list-request-body";

export class InstituteGuardianListRequest {
  header: RequestHeader;
  body: InstituteGuardianListRequestBody;
}
