import { RequestHeader } from "../../header/request-header";
import { GuardianListRequestBody } from "./guardian-list-request-body";

export class GuardianListRequest {
    header: RequestHeader;
    body: GuardianListRequestBody;
}
