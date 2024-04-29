import { RequestHeader } from "../../header/request-header";
import { AdmissionListRequestBody } from "./admission-list-request-body";

export class AdmissionListRequest {
    header:RequestHeader;
    body:AdmissionListRequestBody;
}
