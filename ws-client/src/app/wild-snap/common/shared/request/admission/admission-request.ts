import { RequestHeader } from "../../header/request-header";
import { AdmissionListRequestBody } from "./admission-list-request-body";
import { AdmissionRequestBody } from "./admission-request-body";

export class AdmissionRequest {
    header:RequestHeader;
    body:AdmissionRequestBody;
}
