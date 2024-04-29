import { ResponseHeader } from "../../header/response-header";
import { GuardianListResponseBody } from "./guardian-list-response-body";

export class GuardianListResponse {
    header: ResponseHeader;
    body: GuardianListResponseBody;
}
