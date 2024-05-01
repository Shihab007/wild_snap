import { RequestHeader } from "../../header/request-header";
import { GuardianProfileRequestBody } from "./guardian-profile-request-body";

export class GuardianProfileRequest {
    header: RequestHeader;
    body: GuardianProfileRequestBody;
  }