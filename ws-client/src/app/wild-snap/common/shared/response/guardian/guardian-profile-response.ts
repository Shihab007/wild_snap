import { ResponseHeader } from "../../header/response-header";
import { GuardianProfileResponseBody } from "./guardian-profile-response-body";

export class GuardianProfileResponse {
    header: ResponseHeader;
    body: GuardianProfileResponseBody;
}