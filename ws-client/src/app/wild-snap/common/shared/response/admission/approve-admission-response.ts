import { ResponseHeader } from "../../header/response-header";
import { ApproveAdmissionResponseBody } from "./approve-admission-response-body";

export class ApproveAdmissionResponse {
    header: ResponseHeader;
    body: ApproveAdmissionResponseBody;
}
