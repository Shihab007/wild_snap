import { ResponseHeader } from "../../header/response-header";
import { AdmissionApplication } from "../../model/admission/admission-application";
import { AdmissionListResponseBody } from "./admission-list-response-body";

export class AdmissionResponse {
    header:ResponseHeader;
    body:AdmissionApplication;
}
