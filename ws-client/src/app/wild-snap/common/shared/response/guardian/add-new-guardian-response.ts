import { ResponseHeader } from "../../header/response-header";
import { AddNewGuardianResponseBody } from "./add-new-guardian-response-body";

export class AddNewGuardianResponse {
    header: ResponseHeader;
    body: AddNewGuardianResponseBody;
}
