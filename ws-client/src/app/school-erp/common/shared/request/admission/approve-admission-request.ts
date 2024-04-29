import { RequestHeader } from "../../header/request-header";
import { ApproveAdmissionRequestBody } from "./approve-admission-request-body";

export class ApproveAdmissionRequest {
    header: RequestHeader;
    body: ApproveAdmissionRequestBody;
}
